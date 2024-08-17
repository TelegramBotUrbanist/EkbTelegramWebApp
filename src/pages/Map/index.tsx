import React, { useCallback, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { mapLocationsAtom, fetchLocationsAtom, updateLocationAtom } from './map.atoms';
import MapComponent from '../../components/Map/MapBig';
import { useWebAppLocation } from '../../hooks/useLocation.ts';
import { locationAtom } from '../../atoms/location.atom.ts';

const DEFAULT_CENTER: [number, number] = [56.838866, 60.605269];
const MapPage = () => {
  const [locations] = useAtom(mapLocationsAtom);
  const [, fetchLocations] = useAtom(fetchLocationsAtom);
  const [, updateLocation] = useAtom(updateLocationAtom);

  const webLocation = useAtomValue(locationAtom)
  const handleLocationUpdate = useCallback(async (newLocation: [number, number]) => {
    await updateLocation(newLocation);
  },[updateLocation]);


  useEffect(() => {
    // При монтировании компонента загружаем начальные локации
    fetchLocations();
  }, []);

  useEffect(() => {
    debugger
    if (webLocation) {
      const newLocation: [number, number] = [webLocation.latitude, webLocation.longitude];
      handleLocationUpdate?.(newLocation);
    }
  }, [handleLocationUpdate, webLocation]);

  debugger
  const center: [number, number] = webLocation
    ? [webLocation.latitude, webLocation.longitude]
    : DEFAULT_CENTER;

  return (
    <div>
      <MapComponent
        center={center}
        locations={locations}
  onLocationChange={handleLocationUpdate}
  />
  </div>
);
};

export default MapPage;