const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const validation = require('../controllers/validation');
const profileRouter = require('./profileRoutes');

const router = express.Router();

// Use the profile router for /:userId/profile route after /user
router.use('/:userId/profile', profileRouter);

// All routes after this middleware are protected
router.use(authController.protect);

router
    .route('/me')
    .get(userController.getIdFromCurrentUser, userController.getUser)
    .patch(userController.getIdFromCurrentUser, validation.updateUser, userController.updateUser)
    .delete(userController.getIdFromCurrentUser, userController.deleteUser);

router.route('/watching').get(userController.getIdFromCurrentUser, userController.getWatching);
router.route('/likes').get(userController.getIdFromCurrentUser, userController.getLikes);

// Restrict the following routes to users with role admin only
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(userController.getUser)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
