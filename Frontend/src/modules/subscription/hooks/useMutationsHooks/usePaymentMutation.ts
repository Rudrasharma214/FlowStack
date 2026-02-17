import { useMutation } from '@tanstack/react-query';
import { PaymentService } from '../../services/paymentService';

export const usePaymentMutation = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) => PaymentService.createPayment(subscriptionId),
  });
};
