/**
 * Auth module types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  // Add more user properties as needed
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
