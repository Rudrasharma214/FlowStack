export interface Plan {
  id: number | string;
  name: string;
  description: string;
  monthly_price: string | number;
  yearly_price: string | number;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface PlanCardProps {
  plan: Plan;
  onSelect?: (planId: number | string) => void;
}
