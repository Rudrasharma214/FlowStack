import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from './AuthContext';
import { AuthContext } from './AuthContext';
import { logger } from '@/services';
import {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} from '@/modules/auth/hooks/useMutationHooks/useMutate';
import { AUTH_TOKEN_KEY } from '@/shared';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mutation hooks
  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          logger.info('Initializing auth with existing token');
          // Verify token and get user data from your backend
        }
      } catch (err) {
        logger.error('Failed to initialize auth:', err);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        logger.info(`Login attempt for email: ${email}`);
        const response = await loginMutation.mutateAsync({ email, password });

        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        setUser(response.user);
        logger.info('Login successful');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        logger.error('Login error:', err);
        throw err;
      }
    },
    [loginMutation]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setError(null);
      try {
        logger.info(`Registration attempt for email: ${email}`);
        const response = await signupMutation.mutateAsync({ email, password, name });

        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        setUser(response.user);
        logger.info('Registration successful');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        logger.error('Registration error:', err);
        throw err;
      }
    },
    [signupMutation]
  );

  const logout = useCallback(async () => {
    setError(null);
    try {
      logger.info('User logout');
      await logoutMutation.mutateAsync();

      localStorage.removeItem(AUTH_TOKEN_KEY);
      setUser(null);
      logger.info('Logout successful');
    } catch (err) {
      logger.error('Logout error:', err);
      // Still clear local auth even if logout request fails
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setUser(null);
      throw err;
    }
  }, [logoutMutation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading:
      loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending || isLoading,
    error:
      error ||
      loginMutation.error?.message ||
      signupMutation.error?.message ||
      logoutMutation.error?.message ||
      null,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
