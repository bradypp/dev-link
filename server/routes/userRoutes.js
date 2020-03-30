const router = require('express').Router();
const {
    signUp,
    signIn,
    forgotPassword,
    resetPassword,
    protected,
    updatePassword,
} = require('../controllers/authController');
const { getCurrentUser, deleteUser, updateUser } = require('../controllers/userController');
const validation = require('../utils/validation');
const {
    signUpRules,
    signInRules,
    forgotPasswordRules,
    resetPasswordRules,
    updateUserRules,
    updatePasswordRules,
} = require('../utils/validation/userRules');

router.route('/sign-up').post(validation(signUpRules), signUp);
router.route('/sign-in').post(validation(signInRules), signIn);
router.route('/forgot-password').post(validation(forgotPasswordRules), forgotPassword);
router.route('/reset-password/:token').patch(validation(resetPasswordRules), resetPassword);

// All routes after this middleware are protected
router.use(protected);

router
    .route('/')
    .get(getCurrentUser)
    .patch(validation(updateUserRules), updateUser)
    .delete(deleteUser);
router.route('/update-password').patch(validation(updatePasswordRules), updatePassword);

module.exports = router;
