const router = require('express').Router();
const {
    getCurrentUser,
    deleteUser,
    updateName,
    updateEmail,
} = require('../controllers/api/userController');
const { protected } = require('../controllers/api/authController');
const validation = require('../controllers/api/validation');
const { UPDATE_NAME, UPDATE_EMAIL } = require('../controllers/api/validation/validationTypes');

// All routes after this middleware are protected
router.use(protected);

router
    .route('/')
    .get(getCurrentUser)
    .delete(deleteUser);
router.route('/update-name').patch(validation(UPDATE_NAME), updateName);
router.route('/update-email').patch(validation(UPDATE_EMAIL), updateEmail);

module.exports = router;
