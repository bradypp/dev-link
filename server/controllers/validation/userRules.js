const { body } = require('express-validator');
const { fieldRequired } = require('./utils');

const passwordRegexRules = body(
    'password',
    'Password must contain a mix of letters, numbers and symbols',
)
    .exists()
    .notEmpty()
    .custom(value => value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,}$/g));

const passwordLengthRules = body('password', 'Password must contain at least 8 characters')
    .exists()
    .notEmpty()
    .isLength({ min: 8 });

const password2Rules = body('password2', 'Passwords must match')
    .exists()
    .notEmpty()
    .custom((value, { req }) => value === req.body.password);

const emailRules = body('email', 'Please enter a valid email')
    .trim()
    .normalizeEmail()
    .isEmail();

exports.signUpRules = [
    body('name', 'Name is required')
        .exists()
        .notEmpty()
        .trim(),
    emailRules,
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
];

exports.signInRules = [emailRules, fieldRequired('password', 'Password is required')];

exports.forgotPasswordRules = emailRules;

exports.resetPasswordRules = [passwordRegexRules, passwordLengthRules, password2Rules];

exports.updatePasswordRules = [
    fieldRequired('current_password', 'Please enter your current password'),
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
];

exports.updateUserRules = [
    body('name', 'Name is required')
        .if(body('name').exists())
        .notEmpty()
        .trim(),
    body('email', 'Please enter a valid email')
        .if(body('email').exists())
        .trim()
        .normalizeEmail()
        .isEmail(),
    body('active', 'Active field should be a true or false bool')
        .if(body('active').exists())
        .isBoolean()
        .toBoolean(),
];
