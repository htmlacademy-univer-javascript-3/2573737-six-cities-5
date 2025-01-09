import {createAction} from '@reduxjs/toolkit';
import {TypeCity, TypePlacesInfo} from '../types/types.ts';


export const setCity = createAction<TypeCity>('SET_CITY');
export const setOffers = createAction<TypePlacesInfo[]>('SET_OFFERS');
