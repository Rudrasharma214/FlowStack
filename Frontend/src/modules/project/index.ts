// Pages
export { default as ProjectDashboard } from './pages/ProjectDashboard';
export { default as ProjectDetail } from './pages/ProjectDetail';

// Components
export { default as ProjectList } from './components/ProjectList';
export { default as CreateProjectModal } from './components/CreateProjectModal';
export { default as EditProjectModal } from './components/EditProjectModal';
export { default as ProjectMembers } from './components/ProjectMembers';

// Hooks – Queries
export { useGetProjectsQuery, useGetProjectByIdQuery } from './hooks/useQueriesHooks/useProjectQueries';

// Hooks – Mutations
export { useProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from './hooks/useMutationHooks/useProjectMutation';

// Types
export type { Project, ProjectStatus } from './types/project.types';
export { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from './types/project.types';
export type { CreateProjectData, UpdateProjectData } from './types/serviceTypes/projectService.types';
