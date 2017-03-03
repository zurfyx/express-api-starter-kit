import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Session from 'express-session';
import morgan from 'morgan';
import config from 'config';

import { info, error } from './helpers/log';
import initializeMongodb from './databases/mongodb';
import initializeRedis from './databases/redis';
import routes from './routes';

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

// Databases.
initializeMongodb();
const dbSession = initializeRedis(Session);

// Cookies.
app.use(cookieParser());

// Body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session.
const session = Session({
  resave: true,
  saveUninitialized: true,
  key: config.get('session.key'),
  secret: config.get('session.secret'),
  store: dbSession,
});
app.use(session);
app.use((req, res, next) => {
  if (!req.session) {
    error('Session not found (is Redis down?).');
  }
  next();
});

// Logging (debug only).
app.use(morgan('combined', { stream: { write: msg => info(msg) } }));

// URLs.
app.use('/', routes);

server.listen(PORT);
info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
info(`🌐  API listening on port ${PORT}`);
info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');

export default server;
