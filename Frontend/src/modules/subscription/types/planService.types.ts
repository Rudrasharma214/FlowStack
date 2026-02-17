export interface CreatePlanData {
  name: string;
  description: string;
  monthly_price: number;
  yearly_price: number;
}

export interface updatePlanData {
  name: string;
  description: string;
  monthly_price: number;
  yearly_price: number;
  is_active: boolean;
}
