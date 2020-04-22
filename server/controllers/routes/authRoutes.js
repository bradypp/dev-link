const express = require('express');
const authController = require('../authController');
const validation = require('../validation');

const router = express.Router();

router.route('/sign-up').post(validation.signUp, authController.signUp);
router.route('/sign-in').post(validation.signIn, authController.signIn);
router.route('/sign-out').post(authController.signOut);
router.route('/forgot-password').post(validation.forgotPassword, authController.forgotPassword);
router
    .route('/reset-password/:token')
    .patch(validation.resetPassword, authController.resetPassword);

// All routes after this middleware are protected
router.use(authController.protect);

router.route('/update-password').put(validation.updatePassword, authController.updatePassword);

module.exports = router;
