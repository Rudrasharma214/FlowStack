import { Op } from 'sequelize';
import { sequelize } from '../../../../config/db.js';
import Payment from '../models/payment.model.js';

export async function generateInvoiceNumber({ transaction }) {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;

  const lastRecord = await Payment.findOne({
    attributes: ['invoice_number'],
    where: {
      invoice_number: { [Op.like]: `${prefix}%` },
    },
    order: [
      [
        sequelize.literal(
          `CAST(SUBSTRING(invoice_number, ${prefix.length + 1}) AS UNSIGNED)`
        ),
        'DESC',
      ],
    ],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  let nextNumber = 1;

  if (lastRecord?.invoice_number) {
    const parsed = parseInt(lastRecord.invoice_number.replace(prefix, ''), 10);
    nextNumber = Number.isNaN(parsed) ? 1 : parsed + 1;
  }

  return `${prefix}${String(nextNumber).padStart(3, '0')}`;
}
