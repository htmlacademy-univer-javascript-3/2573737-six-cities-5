import {store} from '../store/store.ts';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  UnKnown = 'UNKNOWN'
}

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/:id',
}
export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type TypeCity = {
  name: City;
  location: TypePlacesLocation;
}

export type TypePlacesLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TypePlaceType = 'Apartment' | 'Room';

export type TypePlacesInfo = {
  id: string;
  city: TypeCity;
  isFavorite: boolean;
  isPremium: false;
  location: TypePlacesLocation;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: 'string';
};

export type TypeReviewInfo = {
  id: number;
  userId: number;
  placeId: number;
  comment: string;
  rating: number;
  reviewTime: string;
}

export type TypeReviewState = {
  comment: string;
  rating: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
