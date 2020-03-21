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
    SIGN_UP,
    SIGN_IN,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    UPDATE_PASSWORD,
    UPDATE_ME,
} = require('../utils/validation/validationTypes');

router.route('/sign-up').post(validation(SIGN_UP), signUp);
router.route('/sign-in').post(validation(SIGN_IN), signIn);
router.route('/forgot-password').post(validation(FORGOT_PASSWORD), forgotPassword);
router.route('/reset-password/:token').patch(validation(RESET_PASSWORD), resetPassword);

// All routes after this middleware are protected
router.use(protected);

router
    .route('/')
    .get(getCurrentUser)
    .patch(validation(UPDATE_ME), updateUser)
    .delete(deleteUser);
router.route('/update-password').patch(validation(UPDATE_PASSWORD), updatePassword);
