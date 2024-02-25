import axios from 'axios';
import { responseError } from './domain/api.dto';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/',
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if ('errors' in data) {
      response.data = responseError(data.message, data.status, data.errors);
    }

    return response;
  },
  (error) => {
    const data = error.response?.data;
    if (data?.status === 403) {
    }
    if (data && 'errors' in data) {
      return Promise.reject(
        responseError(data.message, data.status, data.errors)
      );
    }
    return Promise.reject(responseError(error.message, error.status));
  }
);

export default api;
