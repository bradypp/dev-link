const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

const {} = authController;

// Public routes
router.route('/').post();

// Private routes
router.route('/').get();

module.exports = router;
