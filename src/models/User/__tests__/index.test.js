/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

const User = require('../');

describe('Model: User', () => {
  it('should be invalid if email is empty', async () => {
    const user = new User();
    try {
      await user.validate();
    } catch (error) {
      expect(error.errors.email).to.exist;
    }
  });
});
