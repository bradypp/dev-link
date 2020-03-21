const { body } = require('express-validator');

const fieldRequired = (field, message = 'Field required') => body(field, message).notEmpty();

const nameRules = body('name', 'Name is required')
    .exists()
    .notEmpty()
    .trim();

const updateNameRules = body('name', 'Name is required')
    .if(body('name').exists())
    .notEmpty()
    .trim();

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

const updateEmailRules = body('email', 'Please enter a valid email')
    .if(body('email').exists())
    .trim()
    .normalizeEmail()
    .isEmail();

const updateActiveStatusRules = body('active', 'Active field should be a true or false bool')
    .if(body('active').exists())
    .isBoolean()
    .toBoolean();

const fromDateRules = fieldRequired(
    'from',
    'From date is required and needs to be from the past',
).custom((value, { req }) => (req.body.to ? value < req.body.to : true));

module.exports = {
    fieldRequired,
    nameRules,
    updateNameRules,
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
    emailRules,
    updateEmailRules,
    updateActiveStatusRules,
    fromDateRules,
};
