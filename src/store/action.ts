import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, TypeCity, TypePlacesInfo, UserData} from '../types/types.ts';


export const setCity = createAction<TypeCity>('SET_CITY');
export const setOffers = createAction<TypePlacesInfo[]>('SET_OFFERS');
export const setOffersByCity = createAction<TypePlacesInfo[]>('SET_OFFERS_BY_CITY');
export const setOffersLoading = createAction<boolean>('OFFERS_LOADING');
export const setError = createAction<string | null>('SET_ERROR');
export const setAuthorization = createAction<AuthorizationStatus>('SET_AUTHORIZATION');
export const setUserData = createAction<UserData>('SET_USER_DATA');
