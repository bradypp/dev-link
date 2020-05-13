const { body } = require('express-validator');
const { fieldRequired } = require('./utils');

const passwordRules = fieldRequired('password', 'Password is required')
    .bail()
    .custom(value => value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z])/g))
    .withMessage('Password must contain a mix of letters, numbers and symbols')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must contain at least 8 characters');

const password2Rules = fieldRequired('password2', 'Confirm password is required')
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Password and confirm password must match');

const emailRules = fieldRequired('email', 'Email is required')
    .bail()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email');

const usernameRules = fieldRequired('username', 'Username is required')
    .bail()
    .trim()
    .custom(value => value.split('').indexOf(' ') === -1)
    .withMessage("Username can't contain any spaces");

exports.signUpRules = [
    fieldRequired('name', 'Name is required'),
    usernameRules,
    emailRules,
    passwordRules,
    password2Rules,
];

exports.signInRules = [
    fieldRequired('login', 'Username or email is required'),
    fieldRequired('password', 'Password is required'),
];

exports.forgotPasswordRules = emailRules;

exports.resetPasswordRules = [passwordRules, password2Rules];

exports.updatePasswordRules = [
    fieldRequired('current_password', 'Please enter your current password'),
    passwordRules,
    password2Rules,
];

exports.updateUserRules = [
    body('name', "Name can't be empty")
        .if(body('name').exists())
        .notEmpty(),
    body('username', "Username can't be empty")
        .if(body('username').exists())
        .notEmpty(),
    body('email', "Email can't be empty")
        .if(body('email').exists())
        .notEmpty()
        .bail()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('active', 'Active field should be a true or false bool')
        .if(body('active').exists())
        .isBoolean()
        .toBoolean(),
];
