import { useQuery } from '@tanstack/react-query';
import { PlanService } from '../../services/planService';

export const useGetPlansQuery = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => PlanService.getPlans(),
  });
};

export const useActiveGetPlan = () => {
  return useQuery({
    queryKey: ['active_plan'],
    queryFn: () => PlanService.getActivePlans(),
  });
};
