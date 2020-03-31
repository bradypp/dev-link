const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const validation = require('../validation');

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
    .get(userController.getCurrentUser)
    .patch(validation.updateUser, userController.updateUser)
    .delete(userController.deleteUser);
router.route('/update-password').patch(validation.updatePassword, authController.updatePassword);

module.exports = router;
