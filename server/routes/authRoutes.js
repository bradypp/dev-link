const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/authController');
const { registerValidation } = require('../utils/validation/authValidation');
const validate = require('../utils/validation');

// Public routes
router.route('/register').post(registerValidation(), validate, createUser);
router.route('/login').post(loginUser);

// Private routes

module.exports = router;
