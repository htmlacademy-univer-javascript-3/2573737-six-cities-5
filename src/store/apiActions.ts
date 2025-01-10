import {createAsyncThunk} from '@reduxjs/toolkit';
import {setOffers, setOffersLoading} from './action.ts';
import {AppDispatch, State, TypePlacesInfo} from '../types/types.ts';
import {AxiosInstance} from 'axios';
import {API_ROUTES} from '../services/api.ts';

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
