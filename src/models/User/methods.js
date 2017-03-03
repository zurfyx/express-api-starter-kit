/* eslint-disable import/prefer-default-export */

import bcrypt from 'bcrypt';

export function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => (
      error ? reject(error) : resolve(isMatch)
    ));
  });
}
