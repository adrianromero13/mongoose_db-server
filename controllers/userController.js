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
      //bust must also be saved in user's interface
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
  }
}
