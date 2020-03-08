const router = require('express').Router();
const { getCurrentUser, deleteUser } = require('../controllers/userController');
const { privateRoute } = require('../controllers/authController');

// Private routes
router
    .route('/')
    .get(privateRoute, getCurrentUser)
    .delete(privateRoute, deleteUser);

module.exports = router;
