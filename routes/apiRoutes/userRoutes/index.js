const router = require('express').Router();
// destructure the userController folder
const { addTodo, getAllUserEmails } = require('./../../../controllers/userController');

//  '/api/user/todos (/api/user is already prepended)
router.route('/todos')
    .post(addTodo);

// '/api/user/emails'
router.get('/emails', getAllUserEmails);

module.exports = router;
