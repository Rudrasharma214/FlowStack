import { api } from '@/services/api/axiosInstance';

export const PaymentService = {
  createPayment: async (subscriptionId: string) => {
    const response = await api.post('/payments/create', {
      subscription_id: subscriptionId,
    });
    return response.data;
  },
};
