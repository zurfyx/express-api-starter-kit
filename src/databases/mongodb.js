import config from 'config';
import mongoose from 'mongoose';

import { dev, error } from '~/helpers/log';

mongoose.Promise = Promise;

const dbHost = config.get('database.data.host');
const dbPort = config.get('database.data.port');
const dbName = config.get('database.data.db');
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const reconnectTimeout = config.get('database.data.reconnectTimeout');

function connect() {
  mongoose.connect(dbURI, { auto_reconnect: true })
    .catch(() => {});
}

export default function initializeMongodb() {
  const db = mongoose.connection;

  db.on('connecting', () => {
    dev('Connecting to MongoDB...');
  });

  db.on('error', (err) => {
    error(`MongoDB connection error: ${err}`);
    mongoose.disconnect();
  });

  db.on('connected', () => {
    dev('Connected to MongoDB!');
  });

  db.once('open', () => {
    dev('MongoDB connection opened!');
  });

  db.on('reconnected', () => {
    dev('MongoDB reconnected!');
  });

  db.on('disconnected', () => {
    error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(() => connect(), reconnectTimeout);
  });

  connect();
}
