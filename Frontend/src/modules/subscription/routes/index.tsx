import type { RouteObject } from 'react-router-dom';
import Subscription from '../pages/Subscription';

export const subscriptionRoutes: RouteObject[] = [
  {
    path: '/subscription',
    element: <Subscription />,
  },
];
