const router = require('express').Router();

// destructure the userController folder
const { addTodo, getAllUserEmails } = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');

//  '/api/user/todos (/api/user is already prepended)
router.route('/todos')
// set up so auth is required prior to posting
    .post(requireAuth, addTodo);

// '/api/user/emails'
router.get('/emails', getAllUserEmails);

module.exports = router;
