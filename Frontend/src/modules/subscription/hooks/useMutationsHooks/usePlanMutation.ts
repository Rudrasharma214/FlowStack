import { useMutation } from '@tanstack/react-query';
import { PlanService } from '../../services/planService';
import type { CreatePlanData, updatePlanData } from '../../types/servicesTypes/planService.types';

export const useCreatePlanMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePlanData) => PlanService.createPlan(data),
  });
};

export const useUpdatePlanMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updatePlanData }) =>
      PlanService.updatePlan(id, data),
  });
};

export const useDeletePlanMutation = () => {
  return useMutation({
    mutationFn: (id: string) => PlanService.deletePlan(id),
  });
};
