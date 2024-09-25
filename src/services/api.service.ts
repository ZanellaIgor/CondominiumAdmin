import axios from 'axios';
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
