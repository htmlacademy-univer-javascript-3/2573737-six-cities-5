import {City} from '../types/types.ts';
import getCityOffers from './getCityOffers.ts';

const getCityOffersCount = (city: City): number => (
  getCityOffers(city).length
);

export default getCityOffersCount;
