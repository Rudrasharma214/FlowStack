export interface CreateProjectData {
    name: string;
    description?: string;
}

export interface UpdateProjectData {
    name?: string;
    description?: string;
    status?: 'active' | 'inactive' | 'in_progress' | 'completed';
}  