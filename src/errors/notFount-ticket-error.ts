import { ApplicationError } from '@/protocols';

export function notFoundTicketError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'No tickets for this user!',
  };
}
