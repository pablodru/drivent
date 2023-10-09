import { ApplicationError } from '@/protocols';

export function forbiddenError(): ApplicationError {
  return {
    name: 'forbiddenError',
    message: "It's forbidden for your ticket or the room is already booked.",
  };
}
