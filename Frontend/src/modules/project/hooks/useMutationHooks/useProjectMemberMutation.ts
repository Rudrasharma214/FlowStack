import { useMutation } from '@tanstack/react-query';
import { projectMemberService } from '../../services/projectMemberService';
import type { InviteMemberData } from '../../types/serviceTypes/projectMemberService.types';


export const useInviteMemberToProjectMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['inviteMemberToProject', projectId],
        mutationFn: async (inviteData: InviteMemberData) => {
            const response = await projectMemberService.inviteMemberToProject(projectId, inviteData);
            return response;
        }
    });
};

export const useVerifyInviteMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['verifyInvite', projectId],
        mutationFn: async (token: string) => {
            const response = await projectMemberService.verifyInvite(projectId, token);
            return response;
        }   
    });
};

export const useAcceptInviteMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['acceptInvite', projectId],
        mutationFn: async (token: string) => {
            const response = await projectMemberService.acceptInvite(projectId, token);
            return response;
        }
    });
};

export const useRejectInviteMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['rejectInvite', projectId],
        mutationFn: async (token: string) => {
            const response = await projectMemberService.rejectInvite(projectId, token);
            return response;
        }
    });
};

export const useRemoveMemberFromProjectMutation = (projectId: string) => {
    return useMutation({
        mutationKey: ['removeMemberFromProject', projectId],
        mutationFn: async (userId: string) => {
            const response = await projectMemberService.removeMemberFromProject(projectId, userId);
            return response;
        }
    });
};