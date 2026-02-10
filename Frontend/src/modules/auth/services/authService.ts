import { api } from '@/services';     
import type { 
  changePasswordData,
  loginCredentials,
  registerCredentials,
  resetPasswordData,
  verifyLoginOtpData
} from '../types/authService.types';

export const authService = {
  signup: async (registerCredentials: registerCredentials) => {
    try {
      const response = await api.post('/auth/signup', registerCredentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyEmail: async (token: string) => {
    try {
      const response = await api.post('/auth/verify-email', token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (loginCredentials: loginCredentials) => {
    try {
      const response = await api.post('/auth/login', loginCredentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyLogin: async (data: verifyLoginOtpData) => {
    try {
      const response = await api.post('/auth/verify-login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (data: resetPasswordData) => {
    try {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (data: changePasswordData) => {
    try {
      const response = await api.post('/auth/change-password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      throw error;
    }
  }
};