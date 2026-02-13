import type { RouteObject } from 'react-router-dom';
import { OpenRoute } from '../../../app/routes/OpenRoute';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import VerifyEmail from '../pages/VerifyEmail';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProfileInfo from '../components/profile/ProfileInfo';
import ChangePassword from '../components/profile/ChangePassword';
import GeneralSettings from '../components/profile/GeneralSettings';
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
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProfileInfo />,
      },
      {
        path: 'password',
        element: <ChangePassword />,
      },
      {
        path: 'settings',
        element: <GeneralSettings />,
      },
    ],
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
  {
    path: '/forgot-password',
    element: (
      <OpenRoute>
        <ForgotPassword />
      </OpenRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <OpenRoute>
        <ResetPassword />
      </OpenRoute>
    ),
  },
  {
    path: '/verify-email',
    element: (
      <OpenRoute>
        <VerifyEmail />
      </OpenRoute>
    ),
  },
];
