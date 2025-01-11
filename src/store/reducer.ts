import {city} from '../mocs/city.ts';
import {
  TypePlacesInfo,
  TypeCity,
  AuthorizationStatus,
  UserData,
  TypeOfferData,
  TypeReviewInfo
} from '../types/types.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  setAuthorization,
  setCity, setComments,
  setError, setNearbyOffers, setOfferById,
  setOffers,
  setOffersByCity,
  setOffersLoading,
  setUserData
} from './action.ts';

type InitialState = {
  currentCity: TypeCity;
  cities: TypeCity[];
  offers: TypePlacesInfo[];
  offersByCity: TypePlacesInfo[];
  offerById: TypeOfferData;
  offersLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  reviews: TypeReviewInfo[];
  nearbyOffers: TypePlacesInfo[];
};

const defaultCity: TypeCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
};

const defaultOfferData: TypeOfferData = {
  id: '',
  city: {
    name: 'Paris',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  },
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  previewImage: '',
  price: 0,
  rating: 0,
  title: '',
  type: 'Apartment',
  description: '',
  bedrooms: 0,
  goods: [],
  host: {
    name: '',
    avatarUrl: '',
    isPro: false
  },
  images: [],
  maxAdults: 0
};

const initialState: InitialState = {
  currentCity: defaultCity,
  cities: city,
  offers: [],
  offersByCity: [],
  offerById: defaultOfferData,
  offersLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.UnKnown,
  userData: null,
  reviews: [],
  nearbyOffers: []
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
    })
    .addCase(setAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
      } else {
        state.userData = null;
      }
    })
    .addCase(setOfferById, (state, action) => {
      state.offerById = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.reviews = action.payload;
    });
});
