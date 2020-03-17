const router = require('express').Router();
const { getCurrentUser, deleteUser, updateMe } = require('../controllers/api/userController');
const { protected } = require('../controllers/api/authController');

// All routes after this middleware are protected
router.use(protected);

router
    .route('/')
    .get(getCurrentUser)
    .patch(updateMe)
    .delete(deleteUser);

module.exports = router;
