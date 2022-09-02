import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from './endpoints';
import {store} from '@redux/store';

const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

const initialConfig = () => {
  setupAxios();
};

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const token = store.getState().root?.user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err: any) => {
      Promise.reject(err);
    },
  );

  HTTP_CLIENT.interceptors.response.use(
    response => {
      return response;
    },
    // err => {
    //   console.log(err);
    // },
  );
};

export {HTTP_CLIENT, setupAxios, initialConfig};
