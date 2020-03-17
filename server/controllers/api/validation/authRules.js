const { body } = require('express-validator');

exports.registerRules = () => {
    return [
        body('name', 'Name is required')
            .notEmpty()
            .trim(),
        body('email', 'Please include a valid email')
            .trim()
            .normalizeEmail()
            .isEmail(),
        body('password', 'Password must contain a mix of letters, numbers and symbols')
            .notEmpty()
            .custom(value => value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,}$/g)),
        body('password', 'Password must contain at least 8 characters')
            .notEmpty()
            .isLength({ min: 8 }),
        body('password2', 'Passwords must match')
            .notEmpty()
            .exists()
            .custom((value, { req }) => value === req.body.password),
    ];
};

exports.loginRules = () => {
    return [
        body('email', 'Please include a valid email')
            .trim()
            .normalizeEmail()
            .isEmail(),
        body('password', 'Password is required')
            .notEmpty()
            .exists(),
    ];
};

exports.forgotPasswordRules = () => {
    return [
        body('email', 'Please enter your email')
            .trim()
            .normalizeEmail()
            .isEmail(),
    ];
};

exports.resetPasswordRules = () => {
    return [
        body('password', 'Password must contain a mix of letters, numbers and symbols')
            .notEmpty()
            .custom(value => value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,}$/g)),
        body('password', 'Password must contain at least 8 characters')
            .notEmpty()
            .isLength({ min: 8 }),
        body('password2', 'Passwords must match')
            .notEmpty()
            .exists()
            .custom((value, { req }) => value === req.body.password),
    ];
};
