import { notFoundError } from '@/errors';
import { forbiddenError } from '@/errors/forbidden-error';
import bookingRepository from '@/repositories/booking-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const roomExists = await bookingRepository.checkRoomExists(roomId);
  if (!roomExists) throw notFoundError();
  const ticket = await bookingRepository.checkTicket(userId);
  if (!ticket || !ticket.Ticket) throw forbiddenError();
  const ticketType = await bookingRepository.checkTicketType(ticket.Ticket.ticketTypeId);
  if (ticketType.isRemote || !ticketType.includesHotel || ticket.Ticket.status === 'RESERVED') throw forbiddenError();
  const roomIsBooked = await bookingRepository.checkIsBooked(roomId);
  if (roomIsBooked && roomIsBooked.userId !== userId) throw forbiddenError();

  const booking = await bookingRepository.postBooking(userId, roomId);

  return { bookingId: booking.id };
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  const roomExists = await bookingRepository.checkRoomExists(roomId);
  if (!roomExists) throw notFoundError();
  const bookingExist = await bookingRepository.checkBooking(bookingId);
  if (!bookingExist) throw forbiddenError();
  const ticket = await bookingRepository.checkTicket(userId);
  if (!ticket || !ticket.Ticket) throw forbiddenError();
  const ticketType = await bookingRepository.checkTicketType(ticket.Ticket.ticketTypeId);
  if (ticketType.isRemote || !ticketType.includesHotel || ticket.Ticket.status === 'RESERVED') throw forbiddenError();
  const roomIsBooked = await bookingRepository.checkIsBooked(roomId);
  if (roomIsBooked && roomIsBooked.userId !== userId) throw forbiddenError();

  const booking = await bookingRepository.putBooking(userId, roomId);

  return { bookingId: booking.id };
}

const bookingService = { getBooking, postBooking, putBooking };

export default bookingService;
