const passport = require('passport');

const { ServerError } = require('../helpers/server');
require('../helpers/passport-strategies');

/**
 * Sign in using email and password.
 * req, res, next params are all required this time (passport requires them). This is an exceptional
 * case.
 */
function signin(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signin', (error, user, info) => {
      if (error) {
        return reject(error); // Passport uses callback, but controllerHandler uses Promise.
      }
      if (!user) {
        return reject(new ServerError(info, 400));
      }

      return req.logIn(user, (loginError) => {
        if (loginError) {
          return reject(loginError);
        }
        return resolve(user);
      });
    })(req, res, next);
  });
}

function signup(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signup', (error, user, info) => {
      if (error) {
        return reject(error); // Passport uses callback, but controllerHandler uses Promise.
      }
      if (!user) {
        return reject(new ServerError(info, 400));
      }

      return resolve(user);
    })(req, res, next);
  });
}

module.exports = {
  signin,
  signup,
};
