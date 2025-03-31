import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      const currentPath = window.location.pathname;
      const isLoginRelatedPage = currentPath.includes("login");
      if (!isLoginRelatedPage) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
