import { useMemo, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType } from './AuthContext';
import { AuthContext } from './AuthContext';
import { logger } from '@/services';
import { useQueryClient } from '@tanstack/react-query';
import {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} from '@/modules/auth/hooks/useMutationHooks/useMutate';
import { useGetUser } from '@/modules/auth/hooks/useQueriesHooks/useQuery';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const [token, setTokenState] = useState(() => localStorage.getItem('accessToken'));
  const [error, setError] = useState<string | null>(null);

  // Mutation hooks
  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const logoutMutation = useLogoutMutation();

  // Fetch user ONLY if token exists
  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useGetUser({
    enabled: Boolean(token),
  });

  const user = data?.data || data?.user || data || null;
  const isAuthenticated = Boolean(token && user);

  const setAccessToken = useCallback(
    (newToken: string) => {
      localStorage.setItem('accessToken', newToken);
      setTokenState(newToken);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    [queryClient]
  );

  const getAccessToken = useCallback(() => {
    return localStorage.getItem('accessToken');
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        logger.info(`Login attempt for email: ${email}`);
        const response = await loginMutation.mutateAsync({ email, password });

        // User sample shows token is in response.data
        const accessToken = response.data || response.token;
        if (accessToken) {
          setAccessToken(accessToken);
          logger.info('Login successful');
        } else {
          throw new Error('No access token received');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        logger.error('Login error:', err);
        throw err;
      }
    },
    [loginMutation, setAccessToken]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setError(null);
      try {
        const response = await signupMutation.mutateAsync({ email, password, name });

        const accessToken = response.data || response.token;
        if (accessToken) {
          setAccessToken(accessToken);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        throw err;
      }
    },
    [signupMutation, setAccessToken]
  );

  const logout = useCallback(async () => {
    setError(null);
    try {
      await logoutMutation.mutateAsync();

      localStorage.removeItem('accessToken');
      setTokenState(null);
      queryClient.clear();
    } catch (err) {
      localStorage.removeItem('accessToken');
      setTokenState(null);
      queryClient.clear();
      throw err;
    }
  }, [logoutMutation, queryClient]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading:
        isLoading ||
        loginMutation.isPending ||
        signupMutation.isPending ||
        logoutMutation.isPending,
      error:
        error ||
        loginMutation.error?.message ||
        signupMutation.error?.message ||
        logoutMutation.error?.message ||
        (isError ? queryError?.message || 'Failed to fetch user' : null) ||
        null,
      login,
      register,
      logout,
      clearError,
      setAccessToken,
      getAccessToken,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      error,
      loginMutation.isPending,
      signupMutation.isPending,
      logoutMutation.isPending,
      loginMutation.error,
      signupMutation.error,
      logoutMutation.error,
      isError,
      queryError,
      login,
      register,
      logout,
      clearError,
      setAccessToken,
      getAccessToken,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
