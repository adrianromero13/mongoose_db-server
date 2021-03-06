const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    // trim cuts white noise before and after string
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Todo', TodoSchema);
