/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

const { isPassword } = require('../validate');

describe('Model: User (validate)', () => {
  it('should be valid is password is equal or longer than 4 characters', () => {
    expect(isPassword('🍭'.repeat('4'))).to.be.true;
    expect(isPassword('🍭'.repeat('5'))).to.be.true;
  });

  it('should be invalid is password is less 4 characters long', () => {
    expect(isPassword('')).to.be.false;
    expect(isPassword('🍭'.repeat('3'))).to.be.false;
  });
});
