import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../../../app/routes/ProtectedRoute';
import Dashboard from '../pages/Dashboard';

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];
