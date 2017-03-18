const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Local.
 */
passport.use('local-signin', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return done(null, false, 'Email not found.');
    }

    const passwordMatch = user.comparePassword(password);
    if (!passwordMatch) {
      return done(null, false, 'Incorrect password.');
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('local-signup', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
  const user = await User.findOne({ email }).exec();
  if (user) {
    return done(null, false, 'There is already an account using this email address.');
  }

  const newUser = new User();
  newUser.email = email;
  newUser.password = password;

  try {
    const newUserSaved = await newUser.save();
    return done(null, newUserSaved);
  } catch (error) {
    return done(error);
  }
}));

module.export = passport;
