import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';

interface OpenRouteProps {
  children: React.ReactNode;
}

/**
 * Open route wrapper for public pages (login, register)
 * Redirects to dashboard if user is already authenticated
 */
export const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
