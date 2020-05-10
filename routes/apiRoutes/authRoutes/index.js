const router = require('express').Router();

const{ signup,signin } = require('./../../../controllers/authcontroller');
const{ requireSignIn } = require('./../../../middlewares/authMiddleware');

// '/api/auth/signup'
router.post('/signup', signup);

// user needs to get through 'local' strategy routes (requireSignIn) before getting into singin
router.post('/signin', requireSignIn, signin);

module.exports = router;
