import { prisma } from '@/config';

async function getHotels() {
  return await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getRooms(){
    return await prisma.room.findMany({})
}

async function getHotelById(id: number){
    return await prisma.hotel.findUnique({
        where: { id }
    })
}

async function getRoomsById(hotelId: number) {
    return await prisma.room.findMany({
        where: { hotelId },
        include: { Hotel: true }
    })
}

const hotelsRepository = { getHotels, getRooms, getHotelById, getRoomsById };

export default hotelsRepository;
