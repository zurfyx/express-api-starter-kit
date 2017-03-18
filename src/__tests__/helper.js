const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const fetch = require('node-fetch');
const fetchAbsolute = require('fetch-absolute');

const PORT = process.env.PORT || 3030;

mongoose.Promise = Promise;
const mockgoose = new Mockgoose(mongoose);

// Globals.
global.fetchApi = fetchAbsolute(fetch)(`http://localhost:${PORT}`);
global.headers = { 'Content-Type': 'application/json' };

// Setup.
before(async () => {
  await mockgoose.prepareStorage();
  require('../server'); // eslint-disable-line global-require
});

afterEach(async () => mockgoose.helper.reset());
// TODO. Clear Redis database.
