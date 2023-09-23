import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {

    const ticketsType = await ticketsService.getTicketsType()

    return res.status(httpStatus.OK).send(ticketsType);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const ticketUser = await ticketsService.getTickets(userId);

    return res.status(httpStatus.OK).send(ticketUser);
}

export async function postTicket(req: AuthenticatedRequest, res: Response){
    const ticketTypeId = req.body.ticketTypeId as number;
    const { userId } = req;

    const ticket = await ticketsService.postTickets( userId, ticketTypeId );

    return res.status(httpStatus.CREATED).send(ticket);
}