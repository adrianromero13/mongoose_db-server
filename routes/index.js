const router = require('express').Router();

const apiRoutes = require('./apiRoutes');

// '/' prepended in every route here
router.use('/api', apiRoutes); //if '/api' then handle in apiRoutes

module.exports = router;
