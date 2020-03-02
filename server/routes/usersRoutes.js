const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/usersController');

const router = express.Router();

const { createUser, loginUser, getCurrentUser } = usersController;

// Public routes
router.route('/register').post(createUser);
router.route('/login').post(loginUser);

// Private routes
router.route('/current').get(passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router;
