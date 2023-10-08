import bookingRepository from '@/repositories/booking-repository';
import bookingService from '@/services/booking-service';
import { faker } from '@faker-js/faker';
import { createBookingReponseWithRoom } from '../factories/booking-factory';
import { rejects } from 'assert';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Booking route', () => {
  it('should return booking on GET /booking', async () => {
    const bookingResponse = await createBookingReponseWithRoom();
    const mock = jest.spyOn(bookingRepository, "getBooking").mockResolvedValueOnce(bookingResponse);

    const response = await bookingService.getBooking(faker.datatype.number());
    expect(mock).toBeCalledTimes(1);
    expect(response).toEqual(bookingResponse);
  });
  it('Should return Not Found on GET /booking', async () => {
    jest.spyOn(bookingRepository, "getBooking").mockImplementationOnce((): any => {
      return null;
    });

    const response = bookingService.getBooking(faker.datatype.number());
    expect(response).rejects.toEqual({
      name: "NotFoundError",
      message: 'No result for this search!',
    });
  });
});
