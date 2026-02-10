import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import type {
  changePasswordData,
  loginCredentials,
  registerCredentials,
  resetPasswordData,
  verifyLoginOtpData,
} from '../../types/authService.types';

/**
 * Signup mutation hook
 */
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: registerCredentials) => authService.signup(data),
  });
};

/**
 * Email verification mutation hook
 */
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
  });
};

/**
 * Login mutation hook
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: loginCredentials) => authService.login(credentials),
  });
};

/**
 * Verify login OTP mutation hook
 */
export const useVerifyLoginMutation = () => {
  return useMutation({
    mutationFn: (data: verifyLoginOtpData) => authService.verifyLogin(data),
  });
};

/**
 * Forgot password mutation hook
 */
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
};

/**
 * Reset password mutation hook
 */
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: resetPasswordData) => authService.resetPassword(data),
  });
};

/**
 * Change password mutation hook
 */
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: changePasswordData) => authService.changePassword(data),
  });
};

/**
 * Refresh token mutation hook
 */
export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: () => authService.refreshToken(),
  });
};

/**
 * Logout mutation hook
 */
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
};
