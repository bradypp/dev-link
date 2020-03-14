const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/api/authController');
const { registerValidation, loginValidation } = require('./validation/auth');

// Public routes
router.route('/register').post(registerValidation(), createUser);
router.route('/login').post(loginValidation(), loginUser);

module.exports = router;
