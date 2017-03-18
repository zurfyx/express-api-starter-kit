const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Session = require('express-session');
const morgan = require('morgan');
const config = require('config');
const passport = require('passport');

const log = require('./helpers/log');
const databases = require('./databases');
const routes = require('./routes');

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

// Databases.
databases.mongodb();
const dbSession = databases.redis(Session);

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
    log.error('Session not found (is Redis down?).');
  }
  next();
});

// Passport.
app.use(passport.initialize());
app.use(passport.session());

// Logging (debug only).
app.use(morgan('combined', { stream: { write: msg => log.info(msg) } }));

// URLs.
app.use('/', routes);

server.listen(PORT);
log.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
log.info(`🌐  API listening on port ${PORT}`);
log.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');

module.exports = server;
