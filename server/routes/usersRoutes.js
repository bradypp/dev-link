const express = require('express');
const usersController = require('../controllers/usersController');
const passport = require('passport');

const router = express.Router();

const { createUser, loginUser, currentUser } = usersController;

// Public routes
router.route('/register').post(createUser);
router.route('/login').post(loginUser);

// Private routes
router.route('/current').get(passport.authenticate('jwt', { session: false }), currentUser);

module.exports = router;
