const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/authController');
const { validate, registerValidationRules, loginValidationRules } = require('../validation');

// Public routes
router.route('/register').post(registerValidationRules(), validate, createUser);
router.route('/login').post(loginValidationRules(), validate, loginUser);

module.exports = router;
