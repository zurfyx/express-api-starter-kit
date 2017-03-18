/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

const User = require('../');

describe('Model: User (methods)', () => {
  it('hashed password should match when compared with the original password', async () => {
    // 🍭 === '$2a$10$UWeqdKAnJc2t8PqEBEQEbePLBeYAzWzBlZ7Nw5iE81C7kPCqFw5K6'
    const user = new User({
      password: '$2a$10$UWeqdKAnJc2t8PqEBEQEbePLBeYAzWzBlZ7Nw5iE81C7kPCqFw5K6',
    });

    const isMatch = await user.comparePassword.call(user, '🍭');
    expect(isMatch).to.be.true;
  });

  it('hashed password shouldn\'t match when compared with another password', async () => {
    const user = new User({
      password: '$2a$10$UWeqdKAnJc2t8PqEBEQEbePLBeYAzWzBlZ7Nw5iE81C7kPCqFw5K6',
    });

    const isMatch = await user.comparePassword.call(user, '🍦');
    expect(isMatch).to.be.false;
  });
});
