import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthorization, setOffers, setOffersLoading, setUserData} from './action.ts';
import {AppDispatch, AppRoute, AuthData, AuthorizationStatus, State, TypePlacesInfo, UserData} from '../types/types.ts';
import {AxiosInstance} from 'axios';
import {API_ROUTES} from '../services/api.ts';
import {dropToken, saveToken} from '../services/token.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFERS_FETCH',
  async (_arg, {dispatch, extra: api }) => {
    dispatch(setOffersLoading(true));
    const { data } = await api.get<TypePlacesInfo[]>(API_ROUTES.OFFERS.GET_ALL);
    // eslint-disable-next-line no-console
    // console.log(data);
    dispatch(setOffersLoading(false));
    dispatch(setOffers(data));
  }
);

export const checkAuthorizationStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHECK_AUTHORIZATION_STATUS',
  async(_arg, {dispatch, extra: api}) => {
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
  async ({ email, password}, {dispatch, extra: api}) => {
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
  async (_arg, {dispatch, extra: api }) => {
    await api.delete(API_ROUTES.USER.LOGOUT);
    dropToken();
    dispatch(setAuthorization(AuthorizationStatus.NoAuth));
  },
);
