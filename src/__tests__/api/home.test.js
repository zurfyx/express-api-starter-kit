import { expect } from 'chai';

describe('Home', () => {
  describe('GET /', () => {
    it('should should display "It works!"', async () => {
      const response = await fetchApi('/');
      expect(response.status).to.equal(200);

      const json = await response.json();
      expect(json).to.eql({ msg: 'It works!' });
    });
  });
});
