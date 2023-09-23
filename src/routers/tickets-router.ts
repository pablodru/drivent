import { getTickets, getTicketsType, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketsSchema } from "@/schemas/tickets-schema";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('*', authenticateToken)
    .get('/types', getTicketsType)
    .get('/', getTickets)
    .post('/', validateBody(ticketsSchema), postTicket)

export default ticketsRouter;