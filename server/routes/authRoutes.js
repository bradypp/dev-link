const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/api/authController');
const validation = require('../controllers/api/validation');
const { REGISTER, LOGIN } = require('../controllers/api/validation/validationTypes');

router.route('/register').post(validation(REGISTER), createUser);
router.route('/login').post(validation(LOGIN), loginUser);

module.exports = router;
