const router = require('express').Router();
const { getCurrentUser } = require('../controllers/usersController');
const { protectedRoute } = require('../controllers/authController');

// Public routes

// Protected routes
router.route('/current').get(protectedRoute, getCurrentUser);

module.exports = router;
