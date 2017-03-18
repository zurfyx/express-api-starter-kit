const { expect } = require('chai');

const { Publication } = require('../../models');
const { signinWithLollipop } = require('./auth.test');

describe('Publication', () => {
  describe('GET,POST /publication', () => {
    it('should return an empty array of publications', async () => {
      const response = await fetchApi('/publications');
      const json = await response.json();

      expect(json).to.deep.equal([]);
    });

    it('should prevent publication without authentication', async () => {
      const body = JSON.stringify({ content: 'gimme a 🍭' });
      const response = await fetchApi('/publications', { headers, body, method: 'POST' });
      const json = await response.json();
      expect(response.status).to.equal(403);
      expect(json).to.eql({ error: 'Authentication is required.' });

      const publications = await Publication.find({}).exec();
      expect(publications.length).to.equal(0);
    });

    it('should prevent publications without content', async () => {
      const lollipopUser = await signinWithLollipop();
      const body = JSON.stringify({});
      const response = await fetchApi('/publications', { body, method: 'POST', headers: lollipopUser.headers });
      const json = await response.json();
      expect(response.status).to.equal(400);
      expect(json).to.eql({ error: 'Publication validation failed' });

      const publications = await Publication.find({}).exec();
      expect(publications.length).to.equal(0);
    });

    it('should display a publication on creation', async () => {
      const lollipopUser = await signinWithLollipop();
      const body = JSON.stringify({ content: 'gimme a 🍭' });
      const response = await fetchApi('/publications', { body, method: 'POST', headers: lollipopUser.headers });
      const json = await response.json();
      expect(response.status).to.equal(200);
      expect(json).to.deep.contain({ content: 'gimme a 🍭' });

      const publications = await Publication.find({}).exec();
      expect(publications.length).to.equal(1);

      const getResponse = await fetchApi('/publications');
      const getJson = await getResponse.json();
      expect(getJson.length).to.equal(1);
      expect(getJson[0]).to.deep.contain({ content: 'gimme a 🍭' });
    });
  });
});
