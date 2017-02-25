import config from 'config';
import debug from 'debug';

const prefix = config.has('log.prefix') ? config.get('log.prefix') : '';

const info = debug(`${prefix}info`);
const dev = debug(`${prefix}dev`);
const error = debug(`${prefix}error`);

export {
  info,
  dev,
  error,
};
