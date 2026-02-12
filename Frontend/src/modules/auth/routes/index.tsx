import type { RouteObject } from 'react-router-dom';
import { OpenRoute } from '../../../app/routes/OpenRoute';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { ProtectedRoute } from '../../../app/routes/ProtectedRoute';

export const authRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/welcome',
    element: (
      <OpenRoute>
        <Welcome />
      </OpenRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <OpenRoute>
        <Login />
      </OpenRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <OpenRoute>
        <Register />
      </OpenRoute>
    ),
  },
];
