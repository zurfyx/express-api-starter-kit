/* eslint-disable import/prefer-default-export */

import validator from 'validator';

/**
 * Validates password. Password value must have at least 4 characters.
 * @param {string} value Password value.
 */
export function isPassword(value) {
  return validator.isLength(value, { min: 4 });
}
