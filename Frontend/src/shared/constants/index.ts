/**
 * Application constants and configuration
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// App Configuration
export const APP_NAME = 'TMS';
export const APP_VERSION = '1.0.0';

// Authentication
export const AUTH_TOKEN_KEY = 'accessToken';

// Pagination defaults
export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_PAGE = 1;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Toast messages
export const TOAST_DURATION = 3000; // 3 seconds

// Environment
export const ENV = import.meta.env.MODE;
export const IS_DEV = ENV === 'development';
export const IS_PROD = ENV === 'production';
