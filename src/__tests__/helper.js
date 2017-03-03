import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import fetch from 'node-fetch';
import fetchAbsolute from 'fetch-absolute';

const PORT = process.env.PORT || 3030;

// Globals.
global.fetchApi = fetchAbsolute(fetch)(`http://localhost:${PORT}`);
global.headers = { 'Content-Type': 'application/json' };

// Setup.
before(async () => {
  await mockgoose(mongoose);
  require('~/server'); // eslint-disable-line global-require
});

afterEach((done) => {
  mockgoose.reset(() => done());
  // TODO. Clear Redis database.
});
