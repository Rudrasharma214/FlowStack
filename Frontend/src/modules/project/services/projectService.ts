import { api } from '@/services/api/axiosInstance';
import type { CreateProjectData, UpdateProjectData } from '../types/serviceTypes/projectService.types';

export const projectService = {
    createProject: async (projectData: CreateProjectData) => {
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    getProjects: async () => {
        const response = await api.get('/projects');
        return response.data;
    },

    getProjectById: async (projectId: string) => {
        const response = await api.get(`/projects/${projectId}`);
        return response.data;
    },

    updateProject: async (projectId: string, projectData: UpdateProjectData) => {
        const response = await api.put(`/projects/${projectId}`, projectData);
        return response.data;
    },

    deleteProject: async (projectId: string) => {
        const response = await api.delete(`/projects/${projectId}`);
        return response.data;
    },
};