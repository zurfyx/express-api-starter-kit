/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../');
const { hashPassword } = require('../middleware');

describe('Model: User (middleware)', () => {
  it('should return a hashed password on password modification', (done) => {
    const user = new User({ password: '🍭' });
    sinon.stub(user, 'isModified').callsFake(() => true);
    hashPassword.call(user, () => {
      expect(user.password).to.be.a('string');
      expect(user.password).not.to.equal('🍭');
      done();
    });
  });

  it('should not return a hashed password when password was not modified', (done) => {
    const user = new User({ password: '🍭' });
    sinon.stub(user, 'isModified').callsFake(() => false);
    hashPassword.call(user, () => {
      expect(user.password).to.equal('🍭');
      done();
    });
  });
});
