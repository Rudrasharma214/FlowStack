import { useMutation } from '@tanstack/react-query';
import type { SubscriptionPlan } from '../../types/servicesTypes/subscriptionService.types';
import { SubscriptionService } from '../../services/subscriptionService';

export const useSubscriptionMutation = (data: SubscriptionPlan) => {
  return useMutation({
    mutationFn: () => SubscriptionService.subscribe(data),
  });
};
