import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from './AuthContext';
import { AuthContext } from './AuthContext';
import { logger } from '@/services';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          logger.info('Initializing auth with existing token');
          // Verify token and get user data from your backend
        }
      } catch (err) {
        logger.error('Failed to initialize auth:', err);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      logger.info(`Login attempt for email: ${email}`);
      // Call your backend login endpoint
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // localStorage.setItem('authToken', token);
      // setUser(user);
      // logger.info('Login successful');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      logger.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      logger.info(`Registration attempt for email: ${email}`);
      // Call your backend register endpoint
      // const response = await api.post('/auth/register', { email, password, name });
      // const { token, user } = response.data;
      
      // localStorage.setItem('authToken', token);
      // setUser(user);
      // logger.info('Registration successful');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      logger.error('Registration error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logger.info('User logout');
    localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);


  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
