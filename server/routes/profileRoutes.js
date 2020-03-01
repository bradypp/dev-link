const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Public routes
router.route('/test').get(profileController.test);

module.exports = router;
