import passport from 'passport';

import '~/helpers/passport-strategies';
import { ServerError } from '~/helpers/server';

/**
 * Sign in using email and password.
 * req, res, next params are all required this time (passport requires them). This is an exceptional
 * case.
 */
export function signin(req, res, next) {
  return new Promise((resolve, reject) => { // Passport uses callback, but controllerHandler uses
                                            // Promise.
    passport.authenticate('local-signin', (error, user, info) => {
      if (error) {
        return reject(error);
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

export function signup(req, res, next) {
  return new Promise((resolve, reject) => { // Passport uses callback, but controllerHandler uses
                                            // Promise.
    passport.authenticate('local-signup', (error, user, info) => {
      if (error) {
        return reject(error);
      }
      if (!user) {
        return reject(new ServerError(info, 400));
      }

      return resolve(user);
    })(req, res, next);
  });
}
