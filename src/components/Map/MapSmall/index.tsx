import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const MapComponent = ({ latitude, longitude, pointTitle }) => {
  return (
    <YMaps>
      <Map  instanceRef={ref => { ref && ref.behaviors.disable(['scrollZoom','multiTouch','drag','dblClickZoom']) }}  defaultState={{ center: [latitude, longitude], zoom: 12 }}  width="100%" height="125px">
        <Placemark geometry={[latitude, longitude]} properties={{ iconCaption: pointTitle }} />
      </Map>
    </YMaps>
  );
};

export default MapComponent;
