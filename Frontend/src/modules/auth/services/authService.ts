import { api } from '@/services';
import type {
  changePasswordData,
  loginCredentials,
  registerCredentials,
  resetPasswordData,
  verifyLoginOtpData,
} from '../types/authService.types';

export const authService = {
  signup: async (registerCredentials: registerCredentials) => {
    const response = await api.post('/auth/signup', registerCredentials);
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.post('/auth/verify-email', token);
    return response.data;
  },

  login: async (loginCredentials: loginCredentials) => {
    const response = await api.post('/auth/login', loginCredentials);
    return response.data;
  },

  verifyLogin: async (data: verifyLoginOtpData) => {
    const response = await api.post('/auth/verify-login', data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: resetPasswordData) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  changePassword: async (data: changePasswordData) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh-token');
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};
