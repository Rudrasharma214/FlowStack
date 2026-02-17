// Subscription interface
export interface SubscriptionPlan {
  plan_id: string;
  start_date: string;
  end_date: string;
  billing_cycle: 'monthly' | 'yearly';
  auto_renew: boolean;
  renewed_at: string | null;
}
