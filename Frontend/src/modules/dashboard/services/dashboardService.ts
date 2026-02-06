import { apiClient } from '@/services/api/axiosInstance';
import type { DashboardData } from '../types';

/**
 * Dashboard service
 * Handle all dashboard-related API calls
 */

export const dashboardService = {
  getStats: async (): Promise<DashboardData> => {
    const response = await apiClient.get<DashboardData>('/dashboard/stats');
    return response.data;
  },

  getRecentActivity: async (limit?: number): Promise<DashboardData['recentActivity']> => {
    const response = await apiClient.get('/dashboard/activity', {
      params: { limit },
    });
    return response.data;
  },
};
