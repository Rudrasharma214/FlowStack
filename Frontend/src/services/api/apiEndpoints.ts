/**
 * API Endpoints configuration
 * Centralize all API endpoint URLs
 */

export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    verify: '/auth/verify',
    refreshToken: '/auth/refresh',
  },

  // Users
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/password',
  },

  // Dashboard
  dashboard: {
    stats: '/dashboard/stats',
    activity: '/dashboard/activity',
  },

  // Subscriptions
  subscriptions: {
    list: '/subscriptions',
    plans: '/subscriptions/plans',
    current: '/subscriptions/current',
    create: '/subscriptions',
    cancel: (id: string) => `/subscriptions/${id}`,
  },

  // Payments
  payments: {
    list: '/payments',
    create: '/payments',
    history: '/payments/history',
  },
};
