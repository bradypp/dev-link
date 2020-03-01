const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Public routes
router.route('/test').get(usersController.test);

module.exports = router;
