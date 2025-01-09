import {city} from '../mocs/city.ts';
import {TypePlacesInfo, TypeCity} from '../types/types.ts';
import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action.ts';
import getCityOffers from '../utils/getCityOffers.ts';


type InitialState = {
  currentCity: TypeCity;
  cities: TypeCity[];
  offers: TypePlacesInfo[];
};

const initialState: InitialState = {
  currentCity: city[0],
  cities: city,
  offers: getCityOffers('Paris'),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
