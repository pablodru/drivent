import { prisma } from "@/config";
import { Enrollment, Payment, Ticket } from "@prisma/client";

async function checkTicketById(ticketId: number):Promise<Ticket> {
    return await prisma.ticket.findUnique({
        where:{
            id: ticketId
        },
    })
}

async function checkEnrollmentById(enrollmentId: number):Promise<Enrollment>{
    return await prisma.enrollment.findUnique({
        where:{ id: enrollmentId }
    })
}

async function getPayments(ticketId: number):Promise<Payment> {
    return await prisma.payment.findUnique({
        where: { ticketId }
    })
}

const paymentsRepository = {
    checkTicketById,
    checkEnrollmentById,
    getPayments
}

export default paymentsRepository;