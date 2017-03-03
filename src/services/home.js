/* eslint-disable import/prefer-default-export */

import { ServerError } from '~/helpers/server';

export function processGreeting(name) {
  if (!name) {
    throw new ServerError('Name can\'t be undefined', 400);
  }
  return `Hello ${name}!`;
}
