/**
 * Dashboard module types
 */

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  // Add more properties as needed
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: Date;
  }>;
}
