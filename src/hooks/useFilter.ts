import { TypeCity, TypePlacesInfo, TypeSortFilters} from '../types/types.ts';


type useFilterProps = {
  offers: TypePlacesInfo[];
  currentCity: TypeCity;
  sort: TypeSortFilters;
}


const useFilter = ({offers, currentCity, sort}: useFilterProps) =>
  offers.filter((offer) =>
    offer.city.name === currentCity.name)
    .sort((a, b) => {
      switch (sort) {
        case TypeSortFilters.LOW_TO_HIGH:
          return a.price - b.price;
        case TypeSortFilters.HIGH_TO_LOW:
          return b.price - a.price;
        case TypeSortFilters.TOP_RATED:
          return b.rating - a.rating;
        default:
          return 0;
      }
    }
    );

export default useFilter;
