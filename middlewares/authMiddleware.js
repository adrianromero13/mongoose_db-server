const passport = require('passport');

//Tells passport to look for a 'jwt' strategy that we defined.
//by default > passport uses cookies...we have to change the 'session' to false
const requireAuth = passport.authenticate('jwt', { session: false });

// middleware to look for a 'local' strategy that we defined
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = {
  requireAuth,
  requireSignIn,
};
