import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getTicketsType() :Promise<TicketType[]> {
    const ticketsType = await ticketsRepository.getTicketsType();

    return ticketsType
}

const ticketsService = {
    getTicketsType
}

export default ticketsService;