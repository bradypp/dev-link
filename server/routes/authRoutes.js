const router = require('express').Router();
const {
    createUser,
    loginUser,
    forgotPassword,
    resetPassword,
    protected,
    updatePassword,
} = require('../controllers/api/authController');
const validation = require('../controllers/api/validation');
const {
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    UPDATE_PASSWORD,
} = require('../controllers/api/validation/validationTypes');

router.route('/register').post(validation(REGISTER), createUser);
router.route('/login').post(validation(LOGIN), loginUser);
router.route('/forgot-password').post(validation(FORGOT_PASSWORD), forgotPassword);
router.route('/reset-password/:token').patch(validation(RESET_PASSWORD), resetPassword);

// All routes after this middleware are protected
router.use(protected);

router.route('/update-password').patch(validation(UPDATE_PASSWORD), updatePassword);

module.exports = router;
