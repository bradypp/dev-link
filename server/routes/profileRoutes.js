const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

const { test } = profileController;

// Public routes
router.route('/test').get(test);

module.exports = router;
