import { api } from '@/services/api/axiosInstance';

export const PaymentService = {
    createPayment: async (subscriptionId: string) => {
        const response = await api.post('/subscription/payments/create-order', {
            subscriptionId,
        });
        return response.data;
    },
};
