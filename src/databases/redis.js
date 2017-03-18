const config = require('config');
const { createClient } = require('redis');
const connectRedis = require('connect-redis');

module.exports = (Session) => {
  const redisClient = createClient({
    host: config.get('database.session.host'),
    port: config.get('database.session.port'),
    prefix: config.get('database.session.prefix'),
    disableTTL: true,
  });
  const RedisStore = connectRedis(Session);
  return new RedisStore({ client: redisClient });
};
