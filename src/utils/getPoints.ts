import { TypePlacesInfo, Point} from '../types/types.ts';

const offersToPoints = (allPlaces: TypePlacesInfo[]): Point[] => {
  const points: Point[] = [];
  allPlaces.map((offer) =>
    points.push({
      title: offer.name,
      lat: offer.lat,
      lng: offer.lng,
      offerId: offer.id
    })
  );
  return points;
};

export default offersToPoints;
