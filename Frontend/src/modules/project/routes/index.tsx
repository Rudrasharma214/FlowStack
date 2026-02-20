import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../../../app/routes/ProtectedRoute';
import ProjectDashboard from '../pages/ProjectDashboard';
import ProjectDetail from '../pages/ProjectDetail';

export const projectRoutes: RouteObject[] = [
    {
        path: '/projects',
        element: (
            <ProtectedRoute>
                <ProjectDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/projects/:projectId',
        element: (
            <ProtectedRoute>
                <ProjectDetail />
            </ProtectedRoute>
        ),
    },
];
