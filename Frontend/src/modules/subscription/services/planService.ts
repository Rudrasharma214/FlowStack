import { api } from '@/services/api/axiosInstance';
import type { CreatePlanData, updatePlanData } from '../types/planService.types';

export const planService = {
  // For users to view active plans
  getActivePlans: async () => {
    const response = await api.get('/subscription/plans/active');
    return response.data;
  },

  // For admins to manage all plans
  getPlans: async () => {
    const response = await api.get('/subscription/plans');
    return response.data;
  },

  createPlan: async (planData: CreatePlanData) => {
    const response = await api.post('/subscription/plans', planData);
    return response.data;
  },

  updatePlan: async (planId: string, planData: updatePlanData) => {
    const response = await api.put(`/subscription/plans/${planId}`, planData);
    return response.data;
  },

  deletePlan: async (planId: string) => {
    const response = await api.delete(`/subscription/plans/${planId}`);
    return response.data;
  },
};
