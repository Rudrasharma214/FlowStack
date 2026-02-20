import { useMutation } from "@tanstack/react-query";
import { projectService } from "../../services/projectService";
import type { CreateProjectData, UpdateProjectData } from "../../types/serviceTypes/projectService.types";


export const useProjectMutation = () => {
    return useMutation({
        mutationKey: ['createProject'],
        mutationFn: async (projectData: CreateProjectData) => {
            const response = await projectService.createProject(projectData);
            return response;
        }
    });
};

export const useUpdateProjectMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['updateProject', projectId],
        mutationFn: async (projectData: UpdateProjectData) => {
            const response = await projectService.updateProject(projectId, projectData);
            return response;
        }
    });
};

export const useDeleteProjectMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['deleteProject', projectId],
        mutationFn: async () => {
            const response = await projectService.deleteProject(projectId);
            return response;
        }
    });
};