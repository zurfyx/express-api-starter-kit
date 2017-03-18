const bcrypt = require('bcrypt');

function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => (
      error ? reject(error) : resolve(isMatch)
    ));
  });
}

module.exports = {
  comparePassword,
};
