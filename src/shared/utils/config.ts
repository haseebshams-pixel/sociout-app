import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from './endpoints';
import {store} from '@redux/store';
const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
const HTTP_CLIENT2: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

const initialConfig = () => {
  setupAxios();
  setupFormDataAxios();
};

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    (config: any) => {
      const token = store.getState().root?.user?.token;
      if (token) {
        config.headers['x-auth-token'] = `${token}`;
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

const setupFormDataAxios = () => {
  HTTP_CLIENT2.interceptors.request.use(
    (config: any) => {
      const token = store.getState().root?.user?.token;
      if (token) {
        config.headers['x-auth-token'] = `${token}`;
        config.headers['Content-Type'] = `multipart/form-data`;
      }
      return config;
    },
    (err: any) => {
      Promise.reject(err);
    },
  );

  HTTP_CLIENT2.interceptors.response.use(
    response => {
      return response;
    },
    // err => {
    //   console.log(err);
    // },
  );
};

export {HTTP_CLIENT, setupAxios, initialConfig, HTTP_CLIENT2};
