import axios, {AxiosInstance} from 'axios';
import {getToken} from './token.ts';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  // todo возврат ероров
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['x-token'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error('API error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return api;
};

export const API_ROUTES = {
  OFFERS: {
    GET_ALL: '/offers',
    GET_BY_ID: '/offers/{offerId}',
    GET_NEARBY: '/offers/{offerId}/nearby',
  },
  FAVORITE: {
    GET: '/favorite',
    SET: '/favorite/{offerId}/{status}',
  },
  COMMENTS: {
    GET: '/comments/{offerId}',
    POST: '/comments/{offerId}',
  },
  USER: {
    VALIDATE: '/login',
    LOGIN: '/login',
    LOGOUT: '/logout',
  },
};
