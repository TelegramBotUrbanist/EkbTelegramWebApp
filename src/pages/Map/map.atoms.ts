// atoms/map/map.atoms.ts
import { atom } from 'jotai';
//import './map.mock';
import { MapLocation } from './map.types';
import { http, resetApiProvider } from '../../shared/http.ts';
import { mapLocationsFromApi } from './map.mapper.ts';

// Базовый атом для хранения центра карты
export const mapCenterAtom = atom<[number, number]>([56.838866, 60.605269]);

// Базовый атом для хранения локаций
export const mapLocationsAtom = atom<MapLocation[]>([]);

// Атом для загрузки локаций с write частью
export const fetchLocationsAtom = atom(
  // read часть
  (get) => get(mapLocationsAtom),
  // write часть
  async (get, set) => {
    const center = get(mapCenterAtom);
    try {
      resetApiProvider()
      const response = await http.get('/map/food/establishments/points', {

      });

      set(mapLocationsAtom, mapLocationsFromApi(response.data));
    } catch (error) {
      console.error('Error fetching locations:', error);
      // Можно добавить обработку ошибок
      set(mapLocationsAtom, []);
    }
  }
);

// Атом для обновления местоположения
export const updateLocationAtom = atom(
  // read часть
  null,
  // write часть
  async (get, set, newLocation: [number, number]) => {
    set(mapCenterAtom, newLocation);
    try {
      resetApiProvider()
      const response = await http.get('/map/food/establishments/points', {
        // params: {
        //   lat: newLocation[0],
        //   lng: newLocation[1],
        //   radius: 5000
        // }
      });
      set(mapLocationsAtom, mapLocationsFromApi(response.data));
    } catch (error) {
      console.error('Error updating locations:', error);
      // Можно добавить обработку ошибок
    }
  }
);