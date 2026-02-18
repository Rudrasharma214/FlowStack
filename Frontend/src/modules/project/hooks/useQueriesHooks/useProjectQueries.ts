import { useQuery } from '@tanstack/react-query';
import { projectService } from '../../services/projectService';

export const useGetProjectsQuery = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await projectService.getProjects();
            return response.data;
        }
    });
};

export const useGetProjectByIdQuery = (projectId: string) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: async () => {
            const response = await projectService.getProjectById(projectId);
            return response.data;
        }
    });
};