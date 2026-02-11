import type { RouteObject } from 'react-router-dom';
import { OpenRoute } from '../../../app/routes/OpenRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const authRoutes: RouteObject[] = [
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
