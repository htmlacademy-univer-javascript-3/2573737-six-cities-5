import { State, AppDispatch} from '../types/types.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import {checkAuthorizationStatus, fetchOffers} from '../store/apiActions.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;


export function useInitApp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthorizationStatus());
    dispatch(fetchOffers());
  }, []);
}
