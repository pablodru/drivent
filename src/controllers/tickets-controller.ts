import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {

    const ticketsType = await ticketsService.getTicketsType()

    return res.status(httpStatus.OK).send(ticketsType);
}
