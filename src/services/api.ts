import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

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
