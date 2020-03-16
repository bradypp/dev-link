const router = require('express').Router();
const { getCurrentUser, deleteUser } = require('../controllers/api/userController');
const { privateRoute } = require('../controllers/api/authController');

// All routes after this middleware are private
router.use(privateRoute);

router
    .route('/')
    .get(getCurrentUser)
    .delete(deleteUser);

module.exports = router;
