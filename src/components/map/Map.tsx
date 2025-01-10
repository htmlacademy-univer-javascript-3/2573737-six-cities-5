import React, {useEffect, useRef} from 'react';
import {useMap} from '../../hooks/UseMap.ts';
import {TypeCity,  TypePlacesInfo} from '../../types/types.ts';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: TypePlacesInfo[];
  currentCity: TypeCity;
}

export const Map: React.FC<MapProps> = ({
  offers,
  currentCity,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({mapRef, currentCity});
  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  useEffect(() => {
    if (map) {
      offers.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
};
