export interface Project {
    id: string;
    name: string;
    description?: string;
    status: 'active' | 'inactive' | 'in_progress' | 'completed';
    start_date?: string;
    end_date?: string;
    completed_at?: string;
    created_by: number;
    createdAt: string;
    updatedAt: string;
}

export type ProjectStatus = Project['status'];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    in_progress: 'In Progress',
    completed: 'Completed',
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string }> = {
    active: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-800 dark:text-green-400',
    },
    inactive: {
        bg: 'bg-gray-100 dark:bg-gray-900/30',
        text: 'text-gray-800 dark:text-gray-400',
    },
    in_progress: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-800 dark:text-blue-400',
    },
    completed: {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-800 dark:text-amber-400',
    },
};
