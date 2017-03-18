const validator = require('validator');

/**
 * Validates password. Password value must have at least 4 characters.
 * @param {string} value Password value.
 */
function isPassword(value) {
  return validator.isLength(value, { min: 4 });
}

module.exports = {
  isPassword,
};
