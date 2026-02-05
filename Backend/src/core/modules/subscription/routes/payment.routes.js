import express from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { PaymentService } from '../services/payment.service.js';
import { authenticate } from '../../auth/middlewares/auth.middleware.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { createPaymentOrderSchema } from '../validations/payment.validation.js';

const paymentRoutes = express.Router();

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

/**
 * Create a subscription for a user
 * Path : /api/subscriptions/payments/create-order
 */
paymentRoutes.post(
    '/create-order', 
    authenticate, 
    validate(createPaymentOrderSchema),
    paymentController.createPaymentOrder
);

/**
 * Razorpay Webhook Handler
 * Path : /api/subscriptions/payments/webhook
 */
paymentRoutes.post(
    '/webhook', 
    paymentController.handleWebhook
);


export default paymentRoutes;