import { Router } from 'express';
import { getTickets, getTicketsType, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketsSchema } from '@/schemas/tickets-schema';

const ticketsRouter = Router();

ticketsRouter
  .all('*', authenticateToken)
  .get('/types', getTicketsType)
  .get('/', getTickets)
  .post('/', validateBody(ticketsSchema), postTicket);

export default ticketsRouter;
