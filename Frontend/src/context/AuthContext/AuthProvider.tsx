import { useMemo, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType } from './AuthContext';
import { AuthContext } from './AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useLogoutMutation } from '@/modules/auth/hooks/useMutationHooks/useMutate';
import { useGetUser } from '@/modules/auth/hooks/useQueriesHooks/useQuery';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const [token, setTokenState] = useState(() => localStorage.getItem('accessToken'));
  const [error, setError] = useState<string | null>(null);

  // Mutation hooks
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



  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading: isLoading, // Only user data loading, NOT mutation loading
      error:
        error ||
        logoutMutation.error?.message ||
        (isError ? queryError?.message || 'Failed to fetch user' : null) ||
        null,
      logout,
      setAccessToken,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      error,
      logoutMutation.error,
      isError,
      queryError,
      logout,
      setAccessToken,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
