import { useMutation } from '@tanstack/react-query';
import type { SubscriptionPlan } from '../../types/servicesTypes/subscriptionService.types';
import { SubscriptionService } from '../../services/subscriptionService';

export const useSubscriptionMutation = () => {
  return useMutation({
    mutationFn: (data: SubscriptionPlan) => SubscriptionService.subscribe(data),
  });
};
