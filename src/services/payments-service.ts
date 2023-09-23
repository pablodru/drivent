import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function getPayments(ticketId: number, userId: number) {
    if ( !ticketId ) throw invalidDataError('TicketId must be send on query string.');

    const ticket = await paymentsRepository.checkTicketById(ticketId);
    if ( !ticket ) throw notFoundError();
    
    const enrollment = await paymentsRepository.checkEnrollmentById(ticket.enrollmentId);
    if ( enrollment.userId !== userId ) throw unauthorizedError();

    const payments = await paymentsRepository.getPayments(ticketId);
    return payments
}

const paymentsService = {
    getPayments
}

export default paymentsService;