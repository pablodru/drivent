import { Enrollment, Payment, Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function checkTicketById(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
}

async function checkEnrollmentById(enrollmentId: number): Promise<Enrollment> {
  return await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });
}

async function postPayment(paymentData: CreatePayment) {
  return await prisma.payment.create({
    data: {
      ...paymentData,
    },
  });
}

async function getPayments(ticketId: number): Promise<Payment> {
  return await prisma.payment.findUnique({
    where: { ticketId },
  });
}

async function checkTicketAndTicketType(ticketId: number) {
  const payment = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: { TicketType: true, Enrollment: true },
  });

  if (payment) {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: 'PAID' },
    });
  }
  return payment;
}

export type CreatePayment = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentsRepository = {
  checkTicketById,
  checkEnrollmentById,
  getPayments,
  checkTicketAndTicketType,
  postPayment,
};

export default paymentsRepository;
