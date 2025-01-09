import React, {useEffect, useRef} from 'react';
import {useMap} from '../../hooks/UseMap.ts';
import {TypeCity, Point} from '../../types/types.ts';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: Point[];
  currentCity: TypeCity;
}

export const Map: React.FC<MapProps> = ({
  points,
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
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.lat,
            lng: point.lng,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
};
