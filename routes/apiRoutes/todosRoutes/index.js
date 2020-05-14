const router = require('express').Router();

const { getTodos } = require('./../../../controllers/todoController')
// /api/todos
router.route('/')
  .get(getTodos);

module.exports = router;
