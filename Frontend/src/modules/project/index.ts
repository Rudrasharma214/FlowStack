// Pages
export { default as ProjectDashboard } from './pages/ProjectDashboard';

// Components
export { default as ProjectList } from './components/ProjectList';
export { default as CreateProjectModal } from './components/CreateProjectModal';
export { default as EditProjectModal } from './components/EditProjectModal';

// Hooks – Queries
export { useGetProjectsQuery, useGetProjectByIdQuery } from './hooks/useQueriesHooks/useProjectQueries';

// Hooks – Mutations
export { useProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from './hooks/useMutationHooks/useProjectMutation';

// Types
export type { Project, ProjectStatus } from './types/project.types';
export { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from './types/project.types';
export type { CreateProjectData, UpdateProjectData } from './types/serviceTypes/projectService.types';
