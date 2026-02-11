import type { RouteObject } from 'react-router-dom';
import { OpenRoute } from '../../../app/routes/OpenRoute';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const authRoutes: RouteObject[] = [
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
