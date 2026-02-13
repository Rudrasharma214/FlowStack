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
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
 * Response interceptor - Handle errors globally and auto-refresh token on 401
 */
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle unauthorized access (401) specifically for expired tokens
    if (
      error.response?.status === 401 &&
      (error.response.data as any)?.message === 'Invalid or expired token.' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // The token is directly in response.data.data according to provided sample
        const accessToken = response.data.data;

        if (accessToken) {
          localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        // Optional: window.location.href = '/login';
        return Promise.reject(handleError(refreshError as AxiosError, 'Token Refresh'));
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    const appError = handleError(error, 'API Request');

    // If it's a 401 but not an expired token (or refresh failed), clean up
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    return Promise.reject(appError);
  }
);

export default api;
