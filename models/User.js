// learning how to work with mongoose
const { Schema, model } = require('mongoose'); //destrucured from mongoose (mongoose.Schema, mongoose.model)
const { isEmail, isLength } = require('validator');
const bcrypt = require('bcryptjs');

//creating user Schema
const UserSchema = new Schema({
  email: {
    // using validator to see if real email
    type: String,
    unique: true,  // Unique index to avoid duplicates in the variable
    validate: [isEmail, 'Please enter a valid email address.'],
    required: [true, 'You must provide an email address']
  },
  password: {
    type: String,
    required: [true, 'You must provide a password'],
    //how2 for password validate
    validate: [(value) => isLength(value, { min: 6 }), 'Your password must be at least 6 characters long']
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  // ref: what model should this be referenced to?
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

// declaring pre
UserSchema.pre('save', async function (next) {
  // using 'this' so function must be used
  const user = this;
  //undefined variables 'salt' & 'hash'
  let salt;
  let hash;
  // has user modified properties?
  if (user.isModified('password')) {
    try {
      // generate a random string to use as 'salt'
      salt = await bcrypt.genSalt();   //will return a promise if no callback function, therefore 'await' it
      hash = await bcrypt.hash(user.password, salt);
    } catch (e) {
      next(e);
    }
  }
  user.password = hash;
  //  overwrite the plain text password with our hash
  console.log(user.password);
  // Finally call save
  next();
});

//The candidate password is the password that the user is providing us when they try to sign in
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    //workaround promise required for await function
    return Promise.resolve(isMatch);    //if isMatch is true, then await will happen
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = model('User', UserSchema);
