import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Session from 'express-session';
import morgan from 'morgan';
import config from 'config';

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);

// Hey you! care about my order http://stackoverflow.com/a/16781554/2034015

// Cookies.
app.use(cookieParser());

// Body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// URLs.
app.get('/', (req, res, _next) => res.json({ msg: 'It works!' }));

server.listen(PORT);
console.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');
console.info(`🌐  API listening on port ${PORT}`);
console.info('-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-');

export default server;
