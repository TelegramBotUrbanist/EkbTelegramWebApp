import { MapLocation } from '../../../pages/Map/map.types.ts';
import { Placemark } from '@pbe/react-yandex-maps';
import React from 'react';

interface CustomPlacemarkProps {
  location: MapLocation;
  iconLayoutTemplate: any;
  onClick:any
}

export class CustomPlacemark extends React.Component<CustomPlacemarkProps,any> {
  render() {
    const { location, iconLayoutTemplate,onClick } = this.props;

    if (!iconLayoutTemplate) return null;

    console.log('Rendering placemark with data:', location); // Для отладки

    return (
      <Placemark
        onClick={onClick}
        geometry={location.coordinates}
        properties={{
          iconContent: location,
        }}
        options={{
          iconLayout: iconLayoutTemplate,
          iconShape: {
            type: 'Rectangle',
            coordinates: [[0, 0], [200, 80]]
          },
          // Добавляем интерактивность
          interactivityModel: 'default#transparent'
        }}
      />
    );
  }

  componentDidMount() {
    console.log('Placemark mounted with location:', this.props.location);
  }
}