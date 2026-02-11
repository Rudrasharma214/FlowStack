import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import { ErrorBoundary } from '../errorBoundry/errorBoundry';

import { authRoutes } from '../../modules/auth/routes';
import { dashboardRoutes } from '../../modules/dashboard/routes';
import { subscriptionRoutes } from '../../modules/subscription/routes';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [...authRoutes, ...dashboardRoutes, ...subscriptionRoutes],
  },
];

export const router = createBrowserRouter(routes);
