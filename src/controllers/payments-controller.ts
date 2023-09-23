import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from 'express';
import httpStatus from "http-status";

export async function getPayments ( req: AuthenticatedRequest, res: Response) {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;
    
    const payments = await paymentsService.getPayments(ticketId, userId);

    return res.status(httpStatus.OK).send(payments);
}