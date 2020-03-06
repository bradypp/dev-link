const router = require('express').Router();
const { getCurrentUser, deleteUser } = require('../controllers/userController');
const { protectedRoute } = require('../controllers/authController');

// Protected routes
router
    .route('/')
    .get(protectedRoute, getCurrentUser)
    .delete(protectedRoute, deleteUser);

module.exports = router;
