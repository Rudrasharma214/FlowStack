import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Protected route wrapper for authenticated pages
 * Check user authentication before allowing access
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated = false,
  fallback,
}) => {
  if (!isAuthenticated) {
    return fallback || <div>Redirecting to login...</div>;
  }

  return <>{children}</>;
};
