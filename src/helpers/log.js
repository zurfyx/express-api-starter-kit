const config = require('config');
const debug = require('debug');

const prefix = config.has('log.prefix') ? config.get('log.prefix') : '';

const info = debug(`${prefix}info`);
const dev = debug(`${prefix}dev`);
const error = debug(`${prefix}error`);

module.exports = {
  info,
  dev,
  error,
};
