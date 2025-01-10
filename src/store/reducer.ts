import {city} from '../mocs/city.ts';
import {TypePlacesInfo, TypeCity} from '../types/types.ts';
import { createReducer } from '@reduxjs/toolkit';
import {setCity, setError, setOffers, setOffersByCity, setOffersLoading} from './action.ts';


type InitialState = {
  currentCity: TypeCity;
  cities: TypeCity[];
  offers: TypePlacesInfo[];
  offersByCity: TypePlacesInfo[];
  offersLoading: boolean;
  error: string | null;
};

const defaultCity: TypeCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
};

const initialState: InitialState = {
  currentCity: defaultCity,
  cities: city,
  offers: [],
  offersByCity: [],
  offersLoading: false,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersByCity, (state, action) => {
      state.offersByCity = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.offersLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
