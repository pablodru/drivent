import { prisma } from "@/config"

async function getTicketsType() {
    return await prisma.ticketType.findMany()
}

const ticketsRepository = {
    getTicketsType
}

export default ticketsRepository