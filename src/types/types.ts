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
};

export type TypeReviewInfo = {
  id: number;
  userId: number;
  placeId: number;
  comment: string;
  rating: number;
  review_time: string;
}

export type TypeReviewState = {
  comment: string;
  rating: number;
};
