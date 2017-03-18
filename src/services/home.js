const { ServerError } = require('../helpers/server');

function processGreeting(name) {
  if (!name) {
    throw new ServerError('Name can\'t be undefined', 400);
  }
  return `Hello ${name}!`;
}

module.exports = {
  processGreeting,
};
