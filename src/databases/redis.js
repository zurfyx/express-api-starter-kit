import config from 'config';
import { createClient as createRedisClient } from 'redis';
import connectRedis from 'connect-redis';

export default function initializeRedis(Session) {
  const redisClient = createRedisClient({
    host: config.get('database.session.host'),
    port: config.get('database.session.port'),
    prefix: config.get('database.session.prefix'),
    disableTTL: true,
  });
  const RedisStore = connectRedis(Session);
  return new RedisStore({ client: redisClient });
}
