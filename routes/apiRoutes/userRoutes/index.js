const router = require('express').Router();
// destructure the userController folder
const { addTodo } = require('./../../../controllers/userController');

//  '/api/user/todos (/api/user is already prepended)
router.route('/todos')
    .post()


module.exports = router;
