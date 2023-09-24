import { TicketType } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { notFoundTicketError } from '@/errors/notFount-ticket-error';
import ticketsRepository, { CreateTicket } from '@/repositories/tickets-repository';

async function getTicketsType(): Promise<TicketType[]> {
  const ticketsType = await ticketsRepository.getTicketsType();

  return ticketsType;
}

async function getTickets(userId: number) {
  const enrollment = await ticketsRepository.getEnrollmentById(userId);
  if (!enrollment) throw notFoundTicketError();

  const ticketUser = await ticketsRepository.getTickets(enrollment.id);
  if (!ticketUser) throw notFoundError();

  return ticketUser;
}

async function postTickets(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw invalidDataError('tickedTypeId not send');

  const checkUser = await ticketsRepository.checkUserEnrollment(userId);

  if (!checkUser) throw notFoundError();

  const createData = { ticketTypeId, enrollmentId: checkUser.id, status: 'RESERVED' } as CreateTicket;
  const ticketCreated = await ticketsRepository.createTicket(createData);

  return await ticketsRepository.getTicketById(ticketCreated.id);
}

const ticketsService = {
  getTicketsType,
  getTickets,
  postTickets,
};

export default ticketsService;
