const { expect } = require('chai');

const { User } = require('../../models');

/**
 * Creates an user.
 * Username: lollipop@example.com
 * Password: 🍭🍭🍭🍭
 */
function createLollipopUser() {
  const email = 'lollipop@example.com';
  const password = '🍭'.repeat(4);
  return new User({ email, password }).save();
}

async function signinWithLollipop() {
  const user = await createLollipopUser();
  const body = JSON.stringify({ email: 'lollipop@example.com', password: '🍭'.repeat(4) });
  const response = await fetchApi('/signin', { headers, body, method: 'POST' });
  const jsonResponse = await response.json();
  const cookie = response.headers.get('set-cookie');
  const newHeaders = Object.assign({ cookie }, headers);
  return {
    user,
    response,
    jsonResponse,
    cookie,
    headers: newHeaders,
  };
}

describe('Auth', () => {
  describe('POST /signin', () => {
    it('should signin with an existing user', async () => {
      await createLollipopUser();
      const body = JSON.stringify({ email: 'lollipop@example.com', password: '🍭'.repeat(4) });
      const response = await fetchApi('/signin', { headers, body, method: 'POST' });
      const json = await response.json();

      expect(json).to.deep.contain({ email: 'lollipop@example.com' });
    });

    it('should not signin with a non-existing user', async () => {
      const body = JSON.stringify({ email: 'lollipop@example.com', password: '🍭'.repeat(4) });
      const response = await fetchApi('/signin', { headers, body, method: 'POST' });
      const json = await response.json();

      expect(response.status).to.equal(400);
      expect(json).to.deep.equal({ error: 'Email not found.' });
    });
  });

  describe('POST /signup', () => {
    it('should be able to signup with valid credentials', async () => {
      const body = JSON.stringify({ email: 'lollipop@example.com', password: '🍭'.repeat(4) });
      const response = await fetchApi('/signup', { headers, body, method: 'POST' });
      const json = await response.json();

      expect(json).to.deep.contain({ email: 'lollipop@example.com' });
    });

    it('should not be able to sign up if the email is already taken', async () => {
      await createLollipopUser();
      const body = JSON.stringify({ email: 'lollipop@example.com', password: '🍭'.repeat(4) });
      const response = await fetchApi('/signup', { headers, body, method: 'POST' });
      const json = await response.json();

      expect(response.status).to.equal(400);
      expect(json).to.eql({ error: 'There is already an account using this email address.' });
    });
  });
});

module.exports = {
  createLollipopUser,
  signinWithLollipop,
};
