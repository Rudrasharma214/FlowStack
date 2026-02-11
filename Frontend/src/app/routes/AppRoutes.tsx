import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import { ErrorBoundary } from '../errorBoundry/errorBoundry';
import { RootRedirect } from './RootRedirect';

import { authRoutes } from '../../modules/auth/routes';
import { dashboardRoutes } from '../../modules/dashboard/routes';
import { subscriptionRoutes } from '../../modules/subscription/routes';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      ...authRoutes,
      ...dashboardRoutes,
      ...subscriptionRoutes,
      {
        path: '*',
        element: <RootRedirect />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
