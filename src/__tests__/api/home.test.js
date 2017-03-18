const { expect } = require('chai');

describe('Home', () => {
  describe('GET /', () => {
    it('should display "Hi!"', async () => {
      const response = await fetchApi('/');
      expect(response.status).to.equal(200);

      const json = await response.json();
      expect(json).to.eql({ msg: 'Hi!' });
    });
  });

  describe('GET /greet/:name', () => {
    it('should greet on GET', async () => {
      const response = await fetchApi('/greet/lollipop');
      const json = await response.json();

      expect(json).to.eql({ msg: 'Hello lollipop!' });
    });
  });

  describe('POST /greet', () => {
    it('should greet on POST', async () => {
      const form = JSON.stringify({ name: '🍭' });
      const response = await fetchApi('/greet', { headers, method: 'POST', body: form });
      const json = await response.json();

      expect(json).to.eql({ msg: 'Hello 🍭!' });
    });

    it('should not greet if name is missing', async () => {
      const response = await fetchApi('/greet', { method: 'POST' });
      const json = await response.json();

      expect(response.status).to.equal(400);
      expect(json).to.eql({ error: 'Name can\'t be undefined' });
    });
  });
});
