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
  // type: 'string';
  type: TypePlaceType;
};

export type TypeOfferData = {
  id: string;
  city: TypeCity;
  isFavorite: boolean;
  isPremium: false;
  location: TypePlacesLocation;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  // type: 'string';
  type: TypePlaceType;
  description: string;
  bedrooms: number;
  goods: string[];
  host: TypeHostInfo;
  images: string[];
  maxAdults: number;
};

export type TypeHostInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TypeReviewInfo = {
  id: string;
  user: UserViewInfo;
  rating: number;
  comment: string;
  date: string;
}

export type TypeReviewFormData = {
  id: string;
  comment: string;
  rating: number;
};

export type UserViewInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Token = string;

export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: Token;
}

export const enum TypeSortFilters {
  POPULAR = 'Popular',
  LOW_TO_HIGH = 'Price: low to high',
  HIGH_TO_LOW = 'Price: high to low',
  TOP_RATED = 'Top rated first',
}
