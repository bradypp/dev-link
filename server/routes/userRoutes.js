const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const validation = require('../controllers/validation');
const profileRouter = require('./profileRoutes');

const router = express.Router();

// Use the profile router for /:userId/profile route after /user
router.use('/:userId/profile', profileRouter);

router.route('/sign-up').post(validation.signUp, authController.signUp);
router.route('/sign-in').post(validation.signIn, authController.signIn);
router.route('/forgot-password').post(validation.forgotPassword, authController.forgotPassword);
router
    .route('/reset-password/:token')
    .patch(validation.resetPassword, authController.resetPassword);

// All routes after this middleware are protected
router.use(authController.protected);

router
    .route('/')
    .get(userController.getUser)
    .patch(validation.updateUser, userController.updateUser)
    .delete(userController.deleteUser);
router.route('/update-password').patch(validation.updatePassword, authController.updatePassword);

module.exports = router;
