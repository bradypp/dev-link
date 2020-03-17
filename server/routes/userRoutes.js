const router = require('express').Router();
const { getCurrentUser, deleteUser, updateUser } = require('../controllers/api/userController');
const { protected } = require('../controllers/api/authController');
const validation = require('../controllers/api/validation');
const { UPDATE_ME } = require('../controllers/api/validation/validationTypes');

// All routes after this middleware are protected
router.use(protected);

router
    .route('/')
    .get(getCurrentUser)
    .patch(validation(UPDATE_ME), updateUser)
    .delete(deleteUser);
// router.route('/active').patch(toggleActiveStatus);

module.exports = router;
