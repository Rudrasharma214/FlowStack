import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../../../app/routes/ProtectedRoute';
import Subscription from '../pages/Subscription';
import { Plans } from '../pages/Plans';

export const subscriptionRoutes: RouteObject[] = [
  {
    path: '/subscription',
    element: (
      <ProtectedRoute>
        <Subscription />
      </ProtectedRoute>
    ),
  },
  {
    path: '/plans',
    element: (
      <ProtectedRoute>
        <Plans />
      </ProtectedRoute>
    ),
  },
];
