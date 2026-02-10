import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY } from '@/shared/constants';
import { handleError } from '@/services/errorHandler';

/**
 * Create Axios instance with default configuration
 */
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add auth token to headers
 */
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/**
 * Response interceptor - Handle errors globally
 */
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const appError = handleError(error, 'API Request');

    // Handle unauthorized access
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      // Redirect to login
      // window.location.href = '/login';
    }

    return Promise.reject(appError);
  }
);

export default api;
