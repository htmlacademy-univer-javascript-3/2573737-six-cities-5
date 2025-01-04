import { useEffect, useRef, useState, MutableRefObject } from 'react';
import {TypeCity} from '../../types/types.ts';
import leaflet from 'leaflet';

type useMapProps = {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  currentCity: TypeCity;
}

export function useMap({mapRef, currentCity}: useMapProps) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: currentCity.lat,
          lng: currentCity.lng,
        },
        zoom: 12,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, currentCity]);

  return map;
}
