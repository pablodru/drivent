import { Router } from 'express';
import { getPayments, postPayment } from '@/controllers/payments-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('*', authenticateToken)
  .get('/', getPayments)
  .post('/process', validateBody(createPaymentSchema), postPayment);

export default paymentsRouter;
