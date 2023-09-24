import { AuthenticatedRequest } from "@/middlewares";
import { PaymentBody } from "@/protocols";
import paymentsService from "@/services/payments-service";
import { Response } from 'express';
import httpStatus from "http-status";

export async function getPayments ( req: AuthenticatedRequest, res: Response ) {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;
    
    const payments = await paymentsService.getPayments(ticketId, userId);

    return res.status(httpStatus.OK).send(payments);
}

export async function postPayment ( req: AuthenticatedRequest, res: Response ) {
    const { userId } = req;
    const body = req.body as PaymentBody;
    
    const paymentCreated = await paymentsService.postPayment(body, userId);
    return res.status(httpStatus.OK).send(paymentCreated);
}