const { User, Todo } = require('./../models');


module.exports = {
    addTodo: async (req, res) => {
        // const { text, (hardcoded which will be handled by middleware)}
        const { text, userId } = req.body;
        if (!text) {
            return res.status(403).json({ error: 'You must provide a text ' });
        }

        try {
            // needs to be 'await'
            const newTodo = await new Todo({ text, user: userId }).save(); //saved in the database
            //bust must also be saved in user's interface
            const user = await User.findById(userId);
            // use of .push, then save the change
            user.todos.push(newTodo);
            await user.save();
            //then show the change
            return res.status(200).json(newTodo);
        } catch (e) {
            return res.status(403).json({ e });
            
        }
    }
}
