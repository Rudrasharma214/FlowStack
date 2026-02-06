import { apiClient } from '@/services/api/axiosInstance';
import type { Plan, Subscription } from '../types';

/**
 * Subscription service
 * Handle all subscription-related API calls
 */

export const subscriptionService = {
  getPlans: async (): Promise<Plan[]> => {
    const response = await apiClient.get<Plan[]>('/subscriptions/plans');
    return response.data;
  },

  getCurrentSubscription: async (): Promise<Subscription | null> => {
    try {
      const response = await apiClient.get<Subscription>('/subscriptions/current');
      return response.data;
    } catch {
      return null;
    }
  },

  subscribeToPlan: async (planId: string): Promise<Subscription> => {
    const response = await apiClient.post<Subscription>('/subscriptions', { planId });
    return response.data;
  },

  cancelSubscription: async (subscriptionId: string): Promise<void> => {
    await apiClient.delete(`/subscriptions/${subscriptionId}`);
  },
};
