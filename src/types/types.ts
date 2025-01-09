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
  title: City;
  lat: number;
  lng: number;
}

export type TypePlaceType = 'Apartment' | 'Room';

export type TypePlacesInfo = {
  id: number;
  isPremium?: boolean;
  href: string;
  image: string;
  imageAlt?: string;
  price: number;
  isBookmarked?: boolean;
  rating: number;
  name: string;
  type: TypePlaceType;
  lat: number;
  lng: number;
  city: City;
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

export type Point = {
  title: string;
  lat: number;
  lng: number;
  offerId: number;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
