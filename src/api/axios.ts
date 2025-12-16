import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/token";
import i18n from "../i18n/i18n";

export const API_BASE_URL = "https://api.byd-karshi.uz";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token va language
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Accept-language header qo'shamiz
    const currentLanguage = i18n.language;
    config.headers["Accept-language"] = currentLanguage;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/api/v1/users/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = response.data;
          setTokens(access, refreshToken);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
