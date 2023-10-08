import { prisma } from "@/config";

async function getBooking(userId: number){
    return await prisma.booking.findUnique({
        where: { userId },
        select: { id:true, Room: true },
    })    
}

const bookingRepository = { getBooking };

export default bookingRepository;