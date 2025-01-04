import React, {useEffect, useRef} from 'react';
import {useMap} from './UseMap.ts';
import {TypePlacesInfo, TypeCity} from '../../types/types.ts';
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
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.lat,
            lng: offer.lng,
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
