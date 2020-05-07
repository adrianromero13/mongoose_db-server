const router = require('express').Router();
// '/api' is prepended in every route in this folder

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
// const todosRoutes = require('./todosRoutes');

//  '/auth'
router.use('/auth', authRoutes);

// '/user'
router.use('/user', userRoutes);

// '/todos'
// router.use('/todos', todosRoutes);


module.exports = router;
