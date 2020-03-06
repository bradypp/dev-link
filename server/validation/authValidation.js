const { body } = require('express-validator');

exports.registerValidationRules = () => {
    return [
        body('name', 'Name is required')
            .notEmpty()
            .trim(),
        body('email', 'Please include a valid email')
            .trim()
            .normalizeEmail()
            .isEmail(),
        body('password', 'Password must contain a mix of letters, numbers and symbols')
            .custom(value => value.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,}$/g)),
        body('password', 'Password must contain at least 8 characters')
            .isLength({ min: 8 }),
        body('password2', 'Confirm password must match password')
            .exists()
            .custom((value, { req }) => value === req.body.password),
    ];
};

exports.loginValidationRules = () => {
    return [
        body('email', 'Please include a valid email')
            .trim()
            .normalizeEmail()
            .isEmail(),
        body('password', 'Password is required').exists(),
    ];
};
