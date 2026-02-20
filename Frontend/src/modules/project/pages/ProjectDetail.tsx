import { useParams, useNavigate } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../hooks/useQueriesHooks/useProjectQueries';
import { PROJECT_STATUS_COLORS, PROJECT_STATUS_LABELS, type Project } from '../types/project.types';
import ProjectMembers from '../components/ProjectMembers';

const ProjectDetail = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetProjectByIdQuery(projectId ?? '');

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded" />
                    <div className="h-7 w-64 bg-gray-200 dark:bg-zinc-700 rounded" />
                    <div className="h-6 w-20 bg-gray-200 dark:bg-zinc-700 rounded-full" />
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
                    <div className="h-5 w-48 bg-gray-200 dark:bg-zinc-700 rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-zinc-700 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </button>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-800 p-6 text-center">
                    <p className="text-red-600 dark:text-red-400 font-medium">Failed to load project</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {error instanceof Error ? error.message : 'Project not found'}
                    </p>
                </div>
            </div>
        );
    }

    const project = ((data as { project?: Project })?.project ?? data) as Project;
    const statusColor = PROJECT_STATUS_COLORS[project.status] ?? PROJECT_STATUS_COLORS.inactive;
    const statusLabel = PROJECT_STATUS_LABELS[project.status] ?? project.status;

    const formatDate = (value: string | undefined) =>
        value
            ? new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
            : '—';

    const createdDate = formatDate(project.createdAt ?? project.created_at);
    const updatedDate = formatDate(project.updatedAt ?? project.updated_at);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 flex-wrap">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Projects
                </button>
                <span className="text-gray-300 dark:text-zinc-600">/</span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text}`}>
                    {statusLabel}
                </span>
            </div>

            {/* Info Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 divide-y divide-gray-200 dark:divide-zinc-800">
                {/* Description */}
                <div className="px-6 py-5">
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h2>
                    <p className="text-gray-900 dark:text-white text-sm">
                        {project.description ?? (
                            <span className="italic text-gray-400 dark:text-zinc-500">No description provided</span>
                        )}
                    </p>
                </div>

                {/* Meta grid */}
                <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <MetaItem label="Status" value={statusLabel} />
                    <MetaItem label="Created" value={createdDate} />
                    <MetaItem label="Last Updated" value={updatedDate} />
                </div>
            </div>

            {/* Members */}
            <ProjectMembers projectId={projectId ?? ''} />
        </div>
    );
};

const MetaItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {label}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
);

export default ProjectDetail;
