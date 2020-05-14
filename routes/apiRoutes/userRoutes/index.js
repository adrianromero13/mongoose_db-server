const router = require('express').Router();
// destructure the userController folder

const {
  addTodo,
  getAllUserEmails,
  getUserTodos,
  deleteUserTodoById,
  updateTodoById
} = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');

// /api/user/todos
router.route('/todos')
  // set up so auth is required prior to posting
  .post(requireAuth, addTodo)
  .get(requireAuth, getUserTodos);


router.route('/todo/:todoId')
  .delete(requireAuth, deleteUserTodoById)
  .put(requireAuth, updateTodoById);
// /api/user/emails
router.get('/emails', getAllUserEmails);

module.exports = router;
