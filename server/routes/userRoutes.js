const router = require('express').Router();
const { getCurrentUser, deleteUser } = require('../controllers/api/userController');
const { privateRoute } = require('../controllers/api/authController');

// Private routes
router
    .route('/')
    .get(privateRoute, getCurrentUser)
    .delete(privateRoute, deleteUser);

module.exports = router;
