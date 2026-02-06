/**
 * Subscription module types
 */

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  interval: 'monthly' | 'yearly';
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export interface SubscriptionResponse {
  plans: Plan[];
  userSubscription?: Subscription;
}
