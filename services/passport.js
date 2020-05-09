const passport = require('passport');
const { Srategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { secret } = require('./../config');

const User = require('./../models/User');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization');
    secretOrKey: secret
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        // doing the checks for user security
        if(!user) {
            return done(null, false);
        }
        //otherwise (if user id found)
        return done(null, user);
    } catch (e) {
        //if error
        return done(e, false);
        
    }
});

passport.use(jwtAuth);
