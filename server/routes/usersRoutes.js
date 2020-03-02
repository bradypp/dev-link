const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

const { test, createUser, loginUser } = usersController;

// Public routes
router.route('/test').get(test);
router.route('/register').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;
