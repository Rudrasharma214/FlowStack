import { api } from 'services/api/axiosInstance';
import type { SubscriptionPlan } from '../types/subscriptionService.types';

export const SubscriptionService = {
  subscribe: async (data: SubscriptionPlan) => {
    const response = await api.post('/subscription', data);
    return response.data;
  },

  getMySubscription: async () => {
    const response = await api.get('/subscription');
    return response.data;
  },
};
