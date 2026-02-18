import { api } from '@/services/api/axiosInstance';

export const projectMemberService = {
    inviteMemberToProject: async (projectId: string, userId: string) => {
        const response = await api.post(`/projects/${projectId}/members/invite`, { userId });
        return response.data;
    },

    verifyInvite: async (projectId: string, token: string) => {
        const response = await api.get(`/projects/${projectId}/members/verify-invite`, {
            params: { token },
        });
        return response.data;
    },

    acceptInvite: async (projectId: string, token: string) => {
        const response = await api.post(`/projects/${projectId}/members/accept-invitation`, { token });
        return response.data;
    },

    rejectInvite: async (projectId: string, token: string) => {
        const response = await api.post(`/projects/${projectId}/members/reject-invitation`, { token });
        return response.data;
    },

    getProjectMembers: async (projectId: string) => {
        const response = await api.get(`/projects/${projectId}/members`);
        return response.data;
    },

    removeMemberFromProject: async (projectId: string, userId: string) => {
        const response = await api.delete(`/projects/${projectId}/members/${userId}`);
        return response.data;
    }
};