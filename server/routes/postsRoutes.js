const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

// Public routes
router.route('/test').get(postsController.test);

module.exports = router;
