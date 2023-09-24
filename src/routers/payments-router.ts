import { getPayments, postPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPaymentSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all('*', authenticateToken)
    .get('/', getPayments)
    .post('/process', validateBody(createPaymentSchema), postPayment);

export default paymentsRouter;