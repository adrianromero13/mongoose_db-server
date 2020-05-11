const { isEmail, isLength } = require('validator');
const jwt = require('jwt-simple');

const { User } = require('./../models');
//require the secret inside the controller
const { secret } = require('./../config');

function tokenForUser(user) {
  //We are going to call jwt.encode

  //jwt.encode takes 2 params
  // 1st  info that we want to encode
  // 2nd secret we are going to use to ecrypt it

  //Create  time stamp for token IAT (issued At Time)
  const timeStamp = new Date().getTime();
  //mongo saves id in '_id'
  return jwt.encode({ sub: user._id, iat: timeStamp }, secret);
};

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'You must provide an email and password' });
    }
    if (!isEmail(email)) {
      return res.status(403).json({ error: 'You must provide a valid email address' });
    }
    if (!isLength(password, { min: 6 })) {
      return res.status(403).json({ error: 'Your password must at least be 6 characters long' });
    }
    //try and catch
    try {
      //use User.findOne() to see if there is an existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) { return res.status(401).json({ error: 'That email address is already taken' }); }
      const user = await new User({ email, password }).save();
      // invoke tokenForUser to return only if auth passes (encrypted id for user)
      return res.status(200).json({ token: tokenForUser(user) });
    } catch (e) {
      return res.status(403).json({ e });
    }
  }
  ,
  signin: (req, res) => res.status(200).json({ token: tokenForUser(req.user) }),
};
