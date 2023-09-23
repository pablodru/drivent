import { getPayments } from "@/controllers/payments-controller";
import { authenticateToken, validateQuery } from "@/middlewares";
import { paymentSchemaQuery } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all('*', authenticateToken)
    .get('/', getPayments)

export default paymentsRouter;