import { ApplicationError } from '@/protocols';

export function paymentRequired(resource?: string): ApplicationError {
  return {
    name: 'paymentRequiredError',
    message: resource ? `${resource} payment is Required` : 'Payment required!',
  };
}
