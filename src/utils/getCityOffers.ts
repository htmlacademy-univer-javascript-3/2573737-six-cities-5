import {City} from '../types/types.ts';
import { TypePlacesInfo} from '../types/types.ts';
import { offers} from '../mocs/offers.ts';

const getCityOffers = (city: City): TypePlacesInfo[] =>
  offers.filter((offer: TypePlacesInfo) => offer.city === city);

export default getCityOffers;
