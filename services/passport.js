const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');    // a constructor function

const { secret } = require('./../config');
const User = require('./../models/User');

//declared jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  // { sub: user._id, iat: }
  try {
    const user = await User.findById(payload.sub);
    // doing the checks for user security
    if (!user) {
      return done(null, false);
    }
    //otherwise (if user id found)
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// By default localstrategy is looking for a username
//However, we using email adress
// Here we say: looking for username?
//look for email from property in the request instead.
const localOptions = { usernameField: 'email' };
// Create   local strategy for useres trying to sign in with email and password
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {

  try {
    //   See if there's a user with the given email in our database
    const user = await User.findOne({ email });
    //   If no user was found with this email, we pass null as there's no error to done
    //   We pass false as 2nd params to done because we did not find a user
    if (!user) {
      return done(null, false);
    }
    // Compare the password given by the user to the encrypted password in the database
    // bcrypt will then automatically hash the given password and compare it to the
    // Hashed password in the database
    const isMatch = await user.comparePassword(password);
    // If the password they gave us after it is hashed is equal to the hashed
    // password isMatch will be true, otherwise it will be false
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});
// We are letting passport know that they can now authenticate users using 'jwt' as their string
// when they call passport.authenticate('jwt')
passport.use(jwtAuth);

// Let's passport know that when it calls passport.authenticate('local')
// to use the localLogin strategy that we defined above
passport.use(localLogin);
