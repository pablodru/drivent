import joi from 'joi';
import { TicketBody } from '@/protocols';

export const ticketsSchema = joi.object<TicketBody>({
  ticketTypeId: joi.number().required(),
});
