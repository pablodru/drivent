import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import { Enrollment, Ticket, TicketStatus } from '@prisma/client';

export async function createBookingReponseWithRoom() {
  return {
    id: faker.datatype.number(),
    Room: {
      id: faker.datatype.number(),
      name: faker.address.cityPrefix(),
      capacity: faker.datatype.number(),
      hotelId: faker.datatype.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export async function createRoom() {
  return {
    id: faker.datatype.number(),
    name: faker.address.cityPrefix(),
    capacity: faker.datatype.number(),
    hotelId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function createBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export function createCheckTicketResponse(status: TicketStatus): Enrollment & { Ticket: Ticket } {
  return {
    id: faker.datatype.number(),
    name: faker.animal.cow(),
    cpf: '11111111111',
    birthday: new Date(),
    phone: faker.phone.phoneNumber(),
    userId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    Ticket: {
      id: faker.datatype.number(),
      status,
      ticketTypeId: faker.datatype.number(),
      enrollmentId: faker.datatype.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}

export function createCheckTicketTypeResponse(isRemote: boolean, includesHotel: boolean) {
  return {
    id: faker.datatype.number(),
    name: faker.company.companyName(),
    price: faker.datatype.number(),
    isRemote,
    includesHotel,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function createCheckIsBookedResponse() {
  return {
    id: faker.datatype.number(),
    userId: faker.datatype.number(),
    roomId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createPostBookingResponse() {
  return {
    id: faker.datatype.number(),
    userId: faker.datatype.number(),
    roomId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
