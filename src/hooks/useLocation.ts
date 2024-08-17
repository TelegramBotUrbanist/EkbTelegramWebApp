import { useEffect, useState } from 'react';
import { useNativeTelegram } from './useNativeTelegram.ts';
import { useAtom } from 'jotai';
import { locationAtom } from '../atoms/location.atom.ts';

interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  course: number | null;
  speed: number | null;
  horizontal_accuracy: number | null;
  vertical_accuracy: number | null;
  course_accuracy: number | null;
  speed_accuracy: number | null;
}

interface UseLocationResult {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
  // openSettings: () => void;
  isInitialized: boolean;
}

export const useWebAppLocation = (): UseLocationResult => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [,setLocationAtom] = useAtom(locationAtom)

  const { isReady, webApp } = useNativeTelegram();

  // Функция для получения геолокации через браузерный API
  const getBrowserLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается браузером'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            course: null,
            speed: position.coords.speed,
            horizontal_accuracy: position.coords.accuracy,
            vertical_accuracy: position.coords.altitudeAccuracy,
            course_accuracy: null,
            speed_accuracy: null
          };
          resolve(locationData);
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Доступ к геолокации запрещен';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Информация о местоположении недоступна';
              break;
            case error.TIMEOUT:
              errorMessage = 'Истекло время ожидания запроса геолокации';
              break;
            default:
              errorMessage = 'Произошла ошибка при получении геолокации';
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  };

  useEffect(() => {
    if (!isReady || !webApp) {
      setIsInitialized(true); // Если нет Telegram API, сразу помечаем как инициализированный для браузерной геолокации
      setIsLoading(false);
      return;
    }

    const handleLocationManagerUpdate = () => {
      console.log('LocationManager updated');
      if (webApp.LocationManager) {
        setIsInitialized(true);
        setError(null);
      } else {
        setIsInitialized(false);
        setError('Location manager became unavailable');
      }
    };

    const handleLocationRequest = (event: { locationData: LocationData }) => {
      console.log('Location data received:', event.locationData);
      setLocation(event.locationData);
      setIsLoading(false);
      setError(null);
    };

    webApp.onEvent('locationManagerUpdated', handleLocationManagerUpdate);
    webApp.onEvent('locationRequested', handleLocationRequest);

    if (webApp?.LocationManager) {
      debugger
      webApp.LocationManager.init((success: boolean) => {
        console.log('LocationManager init result:', success);
        setIsInitialized(success);
        setIsLoading(false);
        if (!success) {
          setError('Location initialization failed');
        }
      });
    }

    // return () => {
    //   webApp.offEvent('locationManagerUpdated', handleLocationManagerUpdate);
    //   webApp.offEvent('locationRequested', handleLocationRequest);
    // };
  }, [isReady, webApp]);

  const requestLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Сначала пробуем через Telegram API
      if (webApp?.LocationManager && isInitialized && webApp?.LocationManager?.isInited) {
        try {
          const telegramLocation = await new Promise<LocationData | null>((resolve) => {
            webApp.LocationManager.getLocation((data: LocationData | null) => {
              resolve(data);
            });
          });

          if (telegramLocation) {
            setLocation(telegramLocation);
            setIsLoading(false);
            setLocationAtom(telegramLocation)

            return;
          }
        } catch (e) {
          console.log('Failed to get location through Telegram API, falling back to browser geolocation');
        }
      }

      // Если не получилось через Telegram API или его нет, используем браузерную геолокацию
      console.log('Using browser geolocation');
      const browserLocation = await getBrowserLocation();
      setLocation(browserLocation);
      setLocationAtom(browserLocation)

    } catch (e) {
      console.error('Location request error:', e);
      setError(e instanceof Error ? e.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  // const openSettings = () => {
  //   if (webApp?.LocationManager) {
  //     webApp.LocationManager.openSettings();
  //   } else {
  //     // Для браузерной версии показываем инструкцию
  //     // alert('Пожалуйста, проверьте настройки геолокации в вашем браузере');
  //   }
  // };

  return {
    location,
    isLoading,
    error,
    requestLocation,
    // openSettings,
    isInitialized
  };
};