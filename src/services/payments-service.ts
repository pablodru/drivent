import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import { PaymentBody } from "@/protocols";
import paymentsRepository, { CreatePayment } from "@/repositories/payments-repository";

async function getPayments(ticketId: number, userId: number) {
    if ( !ticketId ) throw invalidDataError('TicketId must be send on query string.');

    const ticket = await paymentsRepository.checkTicketById(ticketId);
    if ( !ticket ) throw notFoundError();
    
    const enrollment = await paymentsRepository.checkEnrollmentById(ticket.enrollmentId);
    if ( enrollment.userId !== userId ) throw unauthorizedError();

    const payments = await paymentsRepository.getPayments(ticketId);
    return payments
}

async function postPayment(body: PaymentBody, userId: number) {
    const ticket = await paymentsRepository.checkTicketAndTicketType(body.ticketId);
    if ( !ticket ) throw notFoundError();
    if ( ticket.Enrollment.userId !== userId ) throw unauthorizedError();

    const paymentData = {
        ticketId: body.ticketId,
        value: ticket.TicketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.toString().slice(-4),
    } as CreatePayment
    const paymentCreated = await paymentsRepository.postPayment(paymentData);
    return paymentCreated
}

const paymentsService = {
    getPayments,
    postPayment
}

export default paymentsService;