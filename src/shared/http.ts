import axios, { AxiosError, AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { concatUrl } from '../utils/concatUrl';

//TODO - change base url

export const http = axios.create({
  baseURL: concatUrl(window.env.BACKEND_URL, '/telegram'),
});

const navigateToPath = (path) => {
  debugger
  const currentUrl = new URL(window.location.href);
  const basePath = currentUrl.pathname.split('/')[1]; // Получаем базовый путь приложения
  const newPath = `/${basePath}${path}`.replace('//', '/'); // Формируем новый путь и убираем дубли слешей
  window.location.replace(newPath);
};


// export const mockHttp = new MockAdapter(http);
export const mockHttp = null
export const adapter = http.defaults.adapter;

let navigationCallback = null;

// Экспортируем функцию для установки навигации
export const setNavigationCallback = (callback) => {
  navigationCallback = callback;
};

http.interceptors.request.use((config) => {
  const session = localStorage.getItem('sessionId');
  debugger
  if (session) {
    config.headers.Authorization = `${session}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    debugger
    if (response.config.url === '/authentication' && response.data?.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    return response;
  },
  (error) => {
    //403 и 401 - запрос на авторизацию
    //404 - not found
    if (([401, 403].includes(error.response?.status) && navigationCallback)
      || error.response?.status === 400 && error?.response.data?.errorCode === 'USER_IS_NOT_SUBSCRIBE_ON_CHANNEL') {

      navigationCallback('/subscription');
    }
    return Promise.reject(error);
  }
);
export const resetApiProvider = () => {
  setAdapter();
};
export const setAdapter = () => {
  http.defaults.adapter = adapter;
};

export const setMockProvider = () => {
  http.defaults.adapter = mockHttp.adapter();
};

