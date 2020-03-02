const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

const { test } = postsController;

// Public routes
router.route('/test').get(test);

module.exports = router;
