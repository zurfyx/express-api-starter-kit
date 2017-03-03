/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import User from '../';

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
