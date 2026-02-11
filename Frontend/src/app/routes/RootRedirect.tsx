import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';

/**
 * Root redirect component
 * Redirects to /dashboard if authenticated, /login if not
 */
export const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
};
