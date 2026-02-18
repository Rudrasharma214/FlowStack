import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../../../app/routes/ProtectedRoute';
import ProjectDashboard from '../pages/ProjectDashboard';

export const projectRoutes: RouteObject[] = [
    {
        path: '/projects',
        element: (
            <ProtectedRoute>
                <ProjectDashboard />
            </ProtectedRoute>
        ),
    }
];
