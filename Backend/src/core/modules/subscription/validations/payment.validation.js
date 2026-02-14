import joi from 'joi';

export const createPaymentOrderSchema = joi.object({
  subscriptionId: joi.number().required(),
});
