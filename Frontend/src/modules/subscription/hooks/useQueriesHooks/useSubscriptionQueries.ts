import { useQuery } from '@tanstack/react-query';
import { SubscriptionService } from '../../services/subscriptionService';

export const useGetMySubscriptionQuery = () => {
  return useQuery({
    queryKey: ['my_subscription'],
    queryFn: () => SubscriptionService.getMySubscription(),
  });
};
