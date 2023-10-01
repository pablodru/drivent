import { prisma } from '@/config';

async function getHotels() {
  return await prisma.hotel.findMany();
}

async function getHotelById(id: number) {
  return await prisma.hotel.findUnique({
    where: { id },
  });
}

async function getRoomsById(id: number) {
  return await prisma.hotel.findUnique({
    where: { id },
    include: { Rooms: true },
  });
}

async function getManyHotels(id: number) {
  return await prisma.hotel.findMany({
    where: { id },
  });
}

const hotelsRepository = { getHotels, getHotelById, getRoomsById, getManyHotels };

export default hotelsRepository;
