import { notFoundError, paymentRequired } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number) {
  const existingEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!existingEnrollment) throw notFoundError('Enrollment');
  const existingTicket = await ticketsRepository.findTicketByEnrollmentId(existingEnrollment.id);
  if (!existingTicket) throw notFoundError('Ticket');
  const hotels = await hotelsRepository.getHotels();

  if (existingTicket.status === 'RESERVED') throw paymentRequired('Ticket');
  if (existingTicket.TicketType.isRemote) throw paymentRequired('Remote');
  if (!existingTicket.TicketType.includesHotel) throw paymentRequired('Include Hotel');

  if (hotels.length === 0 || !hotels) throw notFoundError('Hotel');

  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  const existingEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!existingEnrollment) throw notFoundError('Enrollment');
  const existingTicket = await ticketsRepository.findTicketByEnrollmentId(existingEnrollment.id);
  if (!existingTicket) throw notFoundError('Ticket');
  const hotel = await hotelsRepository.getHotelById(hotelId)
  if (!hotel) throw notFoundError("Hotel");

  if (existingTicket.status === 'RESERVED') throw paymentRequired('Ticket');
  if (existingTicket.TicketType.isRemote) throw paymentRequired('Remote');
  if (!existingTicket.TicketType.includesHotel) throw paymentRequired('Include Hotel');

  const response = await hotelsRepository.getRoomsById(hotelId);

  return response;
}

const hotelsService = { getHotels, getHotelById };

export default hotelsService;
