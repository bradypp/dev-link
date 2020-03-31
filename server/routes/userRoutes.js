const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const validation = require('../validation');
const userRules = require('../validation/userRules');

router.route('/sign-up').post(validation(userRules.signUpRules), authController.signUp);
router.route('/sign-in').post(validation(userRules.signInRules), authController.signIn);
router
    .route('/forgot-password')
    .post(validation(userRules.forgotPasswordRules), authController.forgotPassword);
router
    .route('/reset-password/:token')
    .patch(validation(userRules.resetPasswordRules), authController.resetPassword);

// All routes after this middleware are protected
router.use(authController.protected);

router
    .route('/')
    .get(userController.getCurrentUser)
    .patch(validation(userRules.updateUserRules), userController.updateUser)
    .delete(userController.deleteUser);
router
    .route('/update-password')
    .patch(validation(userRules.updatePasswordRules), authController.updatePassword);

module.exports = router;
