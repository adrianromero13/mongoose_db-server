const { User, Todo } = require('./../models');

module.exports = {
  addTodo: async (req, res) => {
    console.log(req.user);
    // const { text, (hardcoded which will be handled by middleware)}
    // now... req.user will be used to invoke each user instance
    const { text } = req.body;
    if (!text) {
      return res.status(403).json({ error: 'You must provide a text ' });
    }
    try {
      // needs to be 'await'
      const newTodo = await new Todo({ text, user: req.user._id }).save();  //saved in the database
      //but must also be saved in user's interface
      // use of .push, then save the change
      req.user.todos.push(newTodo);
      await req.user.save();
      //then show the change
      return res.status(200).json(newTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  getAllUserEmails: async (req, res) => {
    try {
      const userEmails = await User.find({}, 'email');
      if (!userEmails) { return res.status(404).json({ error: 'No user emails found ' }); }
      return res.status(200).json(userEmails);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

  getUserTodos: async (req, res) => {
    // console.log(req.user);
    try {
      // const user = await await User.findById(req.user._id).populate('todos', 'completed');

      // grab all todos and finding the todos made by the user
      const userTodos = await Todo.find({ user: req.user._id }, 'completed text');
      return res.status(200).json(userTodos);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  deleteUserTodoById: async (req, res) => {
    const { todoId } = req.params;
    try {
      const todoToDelete = await Todo.findById(todoId);
      //check if there is a todo to delete
      if (!todoToDelete) {
        return res.status(401).json({ error: 'No todo with that id' });
      }

      // Check if the current todo belongs to the current logged in user
      //delete should only happen if this is true
      if (req.user._id.toString() !== todoToDelete.user.toString()) { // set .toString to set objects as string
        return res.status(401).json({ error: 'You cannot delete a todo that is not yours!' });
      }

      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      //respond back to the user with the deleted todo (to be stored in memory)
      return res.status(200).json({ deletedTodo });
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  // solutions
  updateTodoById: async (req, res) => {
    const { todoId } = req.params;
    const { text, completed } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'You must provide a text' });
    }
    try {
      const todoToUpdate = await Todo.findById(todoId);
      if (!todoToUpdate) {
        return res.status(404).json({ error: 'No todo with that id' });
      }

      if (req.user._id.toString() !== todoToUpdate.user.toString()) {
        return res.status(401).json({ error: 'You cannot update a todo that is not yours!' });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(todoId,
        //fields you want update
        { completed, text, },
        //this gives us the updated one .findByIdAndUpdate prototype callback
        { new: true });
      return res.status(200).json(updatedTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
}
