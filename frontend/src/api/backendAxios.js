import axios from 'axios';
import LocalStorageService from '../service/LocalStorageService';

const backendAxios = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

backendAxios.interceptors.request.use(
  config => {
    const userId = LocalStorageService.getCurrentUserId()
    if (userId) {
      config.headers['User-Id'] = userId;
    }
    return config;
  },
  error => Promise.reject(error)
)

backendAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response.status)) {
        window.location.href = '/registration';
      }
      return Promise.reject(error);
    }
)

export default backendAxios;