import { useGetProjectsQuery } from '../hooks/useQueriesHooks/useProjectQueries';
import { useDeleteProjectMutation } from '../hooks/useMutationHooks/useProjectMutation';
import {
    PROJECT_STATUS_LABELS,
    PROJECT_STATUS_COLORS,
    type Project,
} from '../types/project.types';
import { useQueryClient } from '@tanstack/react-query';

interface ProjectListProps {
    onCreateClick: () => void;
    onProjectClick?: (project: Project) => void;
}

const ProjectList = ({ onCreateClick, onProjectClick }: ProjectListProps) => {
    const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Projects</h2>
                    <button
                        onClick={onCreateClick}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition"
                    >
                        + New Project
                    </button>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="px-5 py-4 animate-pulse">
                            <div className="flex items-center justify-between mb-3">
                                <div className="h-5 w-48 bg-gray-200 dark:bg-zinc-700 rounded" />
                                <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-700 rounded" />
                            </div>
                            <div className="h-3 w-full bg-gray-200 dark:bg-zinc-700 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-800 p-6 text-center">
                <p className="text-red-600 dark:text-red-400 font-medium">
                    Failed to load projects
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {error instanceof Error ? error.message : 'An unexpected error occurred'}
                </p>
            </div>
        );
    }

    const projectList: Project[] = (projects as { projects: Project[] })?.projects ?? [];

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    All Projects
                </h2>
                <button
                    onClick={onCreateClick}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition"
                >
                    + New Project
                </button>
            </div>

            {projectList.length === 0 ? (
                <div className="px-5 py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No projects yet. Create your first project to get started.
                    </p>
                    <button
                        onClick={onCreateClick}
                        className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition"
                    >
                        Create Project
                    </button>
                </div>
            ) : (
                <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {projectList.map((project) => {
                        const statusColor = PROJECT_STATUS_COLORS[project.status] ?? PROJECT_STATUS_COLORS.inactive;
                        const statusLabel = PROJECT_STATUS_LABELS[project.status] ?? project.status;

                        return (
                            <div
                                key={project.id}
                                onClick={() => onProjectClick?.(project)}
                                className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {project.name}
                                        </h3>
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}
                                        >
                                            {statusLabel}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </span>
                                        <DeleteButton
                                            projectId={project.id}
                                        />
                                    </div>
                                </div>
                                {project.description && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

/** Isolated delete button so each row gets its own mutation instance */
const DeleteButton = ({ projectId }: { projectId: string }) => {
    const queryClient = useQueryClient();
    const deleteMutation = useDeleteProjectMutation(projectId);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={deleteMutation.isPending}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
            title="Delete project"
        >
            {deleteMutation.isPending ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )}
        </button>
    );
};

export default ProjectList;
