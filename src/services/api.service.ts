import axios, { AxiosError } from 'axios';
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Pega o token mais recente do localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
