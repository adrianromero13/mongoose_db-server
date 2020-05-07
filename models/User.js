// learning how to work with mongoose
const { Schema, model } = require('mongoose'); //destrucured from mongoose (mongoose.Schema, mongoose.model)
const { isEmail, isLength } = require('validator');
//creating user Schema
const UserSchema = new Schema({
    email: {
        // using validator to see if real email
        type: String,
        unique: true, // Unique index to avoid duplicates in the variable
        validate: [isEmail, 'Please enter a valid email adress.'],
        required: [true, 'You must provide an email address']
    },
    password: {
        type: String,
        required: [true, 'You must provide a password'],
        //how2 for password validate
        validate: [ (value) => isLength(value, { min: 6}), 'fucked up...6 charactes min' ]
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    // ref: what model should this be referenced to?
    todos: [ {type: Schema.Types.ObjectId, ref: 'Todo'}]
});

module.exports = model('User', UserSchema);
