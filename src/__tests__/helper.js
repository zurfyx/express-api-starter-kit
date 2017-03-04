import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import fetch from 'node-fetch';
import fetchAbsolute from 'fetch-absolute';

const PORT = process.env.PORT || 3030;

const mockgoose = new Mockgoose(mongoose);

// Globals.
global.fetchApi = fetchAbsolute(fetch)(`http://localhost:${PORT}`);
global.headers = { 'Content-Type': 'application/json' };

// Setup.
before(async () => {
  await mockgoose.prepareStorage();
  require('~/server'); // eslint-disable-line global-require
});

afterEach(async () => mockgoose.helper.reset());
// TODO. Clear Redis database.
