import eventBus from '../eventBus.events.js';
import { sendEmail } from '../../../config/sendMail.js';
import { sendPaymentSuccessEmailTemplate } from '../../templates/paymentTemplates/paymentSuccess.template.js';
import { sendPaymentFailedEmailTemplate } from '../../templates/paymentTemplates/paymentFailed.template.js';


eventBus.on('payment.captured', async (data) => {
    const { email, transactionId, planName, name, amount, startDate, endDate, billingCycle } = data;

    await sendEmail({
        to: email,
        subject: 'Payment Successful',
        html: sendPaymentSuccessEmailTemplate({ transactionId, planName, name, amount, startDate, endDate, billingCycle })
    });
});

eventBus.on('payment.failed', async (data) => {
    const { email, transactionId, planName, name } = data;

    await sendEmail({
        to: email,
        subject: 'Payment Failed',
        html: sendPaymentFailedEmailTemplate({ transactionId, planName, name })
    });
});