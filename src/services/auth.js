const { ServerError } = require('../helpers/server');

function requireAuthentication(user) {
  if (!user) {
    throw new ServerError('Authentication is required.', 403);
  }
  return user;
}

module.exports = {
  requireAuthentication,
};
