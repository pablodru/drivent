import { prisma } from '@/config';

async function getBooking(userId: number) {
  return await prisma.booking.findUnique({
    where: { userId },
    select: { id: true, Room: true },
  });
}

async function checkRoomExists(roomId: number) {
  return await prisma.room.findUnique({
    where: { id: roomId },
  });
}

async function checkTicket(userId: number) {
  return await prisma.enrollment.findFirst({
    where: { userId },
    include: { Ticket: true },
  });
}

async function checkTicketType(ticketTypeId: number) {
  return await prisma.ticketType.findUnique({
    where: { id: ticketTypeId },
  });
}

async function checkIsBooked(roomId: number) {
  return await prisma.booking.findFirst({
    where: { roomId },
  });
}

async function postBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: { userId, roomId },
  });
}

async function putBooking(userId: number, roomId: number) {
  return await prisma.booking.update({
    where: { userId },
    data: { roomId },
  });
}

const bookingRepository = { getBooking, checkRoomExists, checkTicket, checkTicketType, checkIsBooked, postBooking, putBooking };

export default bookingRepository;
