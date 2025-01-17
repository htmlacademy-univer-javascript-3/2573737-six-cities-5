import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getFavoriteOffers,
  setAuthorization,
  setComments,
  setNearbyOffers,
  setOfferById,
  setOffers,
  setOffersLoading,
  setUserData
} from './action.ts';
import {
  AppDispatch,
  AppRoute,
  AuthData,
  AuthorizationStatus,
  State, TypeFavorite,
  TypeOfferData,
  TypePlacesInfo, TypeReviewFormData, TypeReviewInfo,
  UserData
} from '../types/types.ts';
import {AxiosInstance} from 'axios';
import {API_ROUTES} from '../services/api.ts';
import {dropToken, saveToken} from '../services/token.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFERS_FETCH',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(true));
    const {data} = await api.get<TypePlacesInfo[]>(API_ROUTES.OFFERS.GET_ALL);
    dispatch(setOffersLoading(false));
    dispatch(setOffers(data));
  }
);

export const fetchOfferById = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFER_FETCH',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(true));
    const {data} = await api.get<TypeOfferData>(`${API_ROUTES.OFFERS.GET_BY_ID.replace('{offerId}', id)}`);
    dispatch(setOffersLoading(false));
    dispatch(setOfferById(data));
  }
);

export const checkAuthorizationStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHECK_AUTHORIZATION_STATUS',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(AppRoute.Login);
      dispatch(setAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(setAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER_LOGIN',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(API_ROUTES.USER.LOGIN, {email, password});
    saveToken(data.token);
    dispatch(setAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER_LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(API_ROUTES.USER.LOGOUT);
    dropToken();
    dispatch(setAuthorization(AuthorizationStatus.NoAuth));
  },
);


export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'COMMENT_FETCH',
  async (id, {dispatch, extra: api}) => {
    // todo rename setOfferLoading на setLoading
    // todo rename reviews to comment
    dispatch(setOffersLoading(true));// eslint-disable-next-line no-console
    const {data} = await api.get<TypeReviewInfo[]>(`${API_ROUTES.COMMENTS.GET.replace('{offerId}', id)}`);
    dispatch(setOffersLoading(false));
    dispatch(setComments(data));
  }
);

export const fetchNearby = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEARBY_FETCH',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(true));// eslint-disable-next-line no-console
    const {data} = await api.get<TypePlacesInfo[]>(`${API_ROUTES.OFFERS.GET_NEARBY.replace('{offerId}', id)}`);
    dispatch(setOffersLoading(false));
    dispatch(setNearbyOffers(data));
  }
);

export const postComment = createAsyncThunk<void, TypeReviewFormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'POST_REVIEW',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    await api.post<TypeReviewFormData>(`${API_ROUTES.COMMENTS.POST.replace('{offerId}', id)}`, {comment, rating});
    dispatch(fetchComments(id));
  },
);
export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAV_FETCH',
  async (_arg, {dispatch, extra: api}) => {
    // eslint-disable-next-line no-console
    console.log('fav offer');
    dispatch(setOffersLoading(true));// eslint-disable-next-line no-console
    const {data} = await api.get<TypePlacesInfo[]>(API_ROUTES.FAVORITE.GET);
    dispatch(setOffersLoading(false));
    dispatch(getFavoriteOffers(data));
  }
);
export const postFavoriteOffers = createAsyncThunk<void, TypeFavorite, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAV_POST',
  async ({offerId, status}, {dispatch, extra: api}) => {
    const url = API_ROUTES.FAVORITE.SET.replace(/\{offerId\}/g, String(offerId)).replace(/\{status\}/g, String(status));
    await api.post(url);
    dispatch(fetchFavoriteOffers);
  }
);
