/* eslint-disable import/prefer-default-export */

import { ServerError } from '~/helpers/server';

export function requireAuthentication(user) {
  if (!user) {
    throw new ServerError('Authentication is required.', 403);
  }
  return user;
}
