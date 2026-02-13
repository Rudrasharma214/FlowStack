import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  profile_pic?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
