import axios from "axios";
import { getToken, clearToken } from "../utils/tokenStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default httpClient;