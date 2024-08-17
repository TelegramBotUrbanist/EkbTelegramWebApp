import axios, { AxiosError, AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const http = axios.create({
  baseURL: '',
});

export const mockHttp = new MockAdapter(http);

export const adapter = http.defaults.adapter;

http.interceptors.request
  .use
  // async (request) => {
  //   if (request.url.toLowerCase().includes('/auth')) {
  //     return request;
  //   }
  //   request.headers.Authorization = `Bearer ${await getToken()}`;
  //   return request;
  // },
  // function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // },
  ();

http.interceptors.response
  .use
  // async (response) => {
  //   if(response.request.url.toString().contains('/auth')){
  //     await handleSetToken(response)
  //   }
  //   return response
  // },
  // (err) => {
  //   const shouldLogout = err.response && err.response.status === 401
  //   if (shouldLogout) {
  //    //TODO redirect to auth
  //   }
  //
  //   throw err
  // },
  ();
