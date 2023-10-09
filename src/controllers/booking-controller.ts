import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const booking = await bookingService.getBooking(userId);

  return res.status(httpStatus.OK).send(booking);
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);

  const booking = await bookingService.postBooking(userId, roomId);

  return res.status(httpStatus.OK).send(booking);
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  const bookingId = Number(req.params.bookingId);

  const booking = await bookingService.putBooking(userId, roomId, bookingId);

  return res.status(httpStatus.OK).send(booking);
}
