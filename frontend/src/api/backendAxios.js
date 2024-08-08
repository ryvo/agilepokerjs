import axios from 'axios';

const backendAxios = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

backendAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response.status)) {
        window.location.href = '/register';
      }
      return Promise.reject(error);
    }
)

export default backendAxios;