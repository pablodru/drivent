import bookingRepository from '@/repositories/booking-repository';
import bookingService from '@/services/booking-service';
import { faker } from '@faker-js/faker';
import { createBookingReponseWithRoom, createCheckIsBookedResponse, createCheckTicketResponse, createCheckTicketTypeResponse, createPostBookingResponse, createRoom } from '../factories/booking-factory';
import { rejects } from 'assert';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /booking', () => {
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

describe('POST /booking', () => {
  it('should return Not Found on POST /booking', async () => {
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(null);

    const response = bookingService.postBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual({
      name: "NotFoundError",
      message: 'No result for this search!',
    });
  })
  it('should return Forbidden when is not PAID on POST /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("RESERVED");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(false, true);
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);

    const response = bookingService.postBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should return Forbidden when is Remote on POST /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(true, true);
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);

    const response = bookingService.postBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should return Forbidden when does not includes Hotel on POST /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(true, false);
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);

    const response = bookingService.postBooking(faker.datatype.number(), faker.datatype.number());
    console.log(response)
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should return Forbidden when the room is booked on POST /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(false, true);
    const checkIsBookedResponse = createCheckIsBookedResponse();
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);
    jest.spyOn(bookingRepository, "checkIsBooked").mockResolvedValue(checkIsBookedResponse);

    const response = bookingService.postBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should make booking on POST /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(false, true);
    const postBookingResponse = createPostBookingResponse();
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);
    jest.spyOn(bookingRepository, "checkIsBooked").mockResolvedValue(null);
    jest.spyOn(bookingRepository, "postBooking").mockResolvedValue(postBookingResponse);  

    const response = await bookingService.postBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).toEqual({bookingId: postBookingResponse.id});
  })
})

describe('PUT /booking', () => {
  it('should return Not Found on PUT /booking', async () => {
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(null);

    const response = bookingService.putBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual({
      name: "NotFoundError",
      message: 'No result for this search!',
    });
  })
  it('should return Forbidden when is not PAID on PUT /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("RESERVED");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(false, true);
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);

    const response = bookingService.putBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should return Forbidden when is Remote on PUT /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(true, true);
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);

    const response = bookingService.putBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should return Forbidden when does not includes Hotel on PUT /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(true, false);
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);

    const response = bookingService.putBooking(faker.datatype.number(), faker.datatype.number());
    console.log(response)
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should return Forbidden when the room is booked on PUT /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(false, true);
    const checkIsBookedResponse = createCheckIsBookedResponse();
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);
    jest.spyOn(bookingRepository, "checkIsBooked").mockResolvedValue(checkIsBookedResponse);

    const response = bookingService.putBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).rejects.toEqual( {
      name: 'forbiddenError',
      message: "It's forbidden for your ticket or the room is already booked."
    });
  })
  it('should make booking on PUT /booking', async () => {
    const room = createRoom();
    const checkTicketResponse = createCheckTicketResponse("PAID");
    const checkTicketTypeResponse = createCheckTicketTypeResponse(false, true);
    const putBookingResponse = createPostBookingResponse();
    jest.spyOn(bookingRepository, "checkRoomExists").mockResolvedValueOnce(room);
    jest.spyOn(bookingRepository, "checkTicket").mockResolvedValue(checkTicketResponse);
    jest.spyOn(bookingRepository, "checkTicketType").mockResolvedValue(checkTicketTypeResponse);
    jest.spyOn(bookingRepository, "checkIsBooked").mockResolvedValue(null);
    jest.spyOn(bookingRepository, "putBooking").mockResolvedValue(putBookingResponse);  

    const response = await bookingService.putBooking(faker.datatype.number(), faker.datatype.number());
    expect(response).toEqual({bookingId: putBookingResponse.id});
  })
})
