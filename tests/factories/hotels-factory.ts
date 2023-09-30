import faker from '@faker-js/faker';
import { Hotel, Room, User } from '@prisma/client';
import { prisma } from '@/config';

type HotelToCreate = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;

export async function createHotel() {
  const hotel: HotelToCreate = {
    name: faker.locale,
    image: faker.image.imageUrl(),
  };
  return await prisma.hotel.create({
    data: {
      ...hotel,
    },
  });
}

export async function createRoom(hotelId: number) {
  return await prisma.room.create({
    data: {
      name: faker.name.lastName(),
      capacity: faker.datatype.number(),
      hotelId,
    },
  });
}

export async function createBooking(user: User, room: Room) {
  return await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
    },
  });
}
