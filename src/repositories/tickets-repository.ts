import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

export type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketsType() {
  return await prisma.ticketType.findMany();
}

async function getEnrollmentById(userId: number) {
  return await prisma.enrollment.findUnique({
    where: { userId },
  });
}

async function getTickets(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    include: { TicketType: true },
    where: { enrollmentId },
  });
}

async function checkUserEnrollment(userId: number) {
  return await prisma.enrollment.findUnique({
    where: { userId },
  });
}

async function createTicket(createData: CreateTicket) {
  return await prisma.ticket.create({
    data: {
      ...createData,
    },
  });
}

async function getTicketById(id: number) {
  return await prisma.ticket.findFirst({
    where: { id },
    include: { TicketType: true },
  });
}

const ticketsRepository = {
  getTicketsType,
  getEnrollmentById,
  getTickets,
  checkUserEnrollment,
  createTicket,
  getTicketById,
};

export default ticketsRepository;
