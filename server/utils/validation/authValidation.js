const { body } = require('express-validator');

exports.registerValidation = () => {
    return [
        body('name', 'Name is required')
            .notEmpty()
            .trim(),
        body('email', 'Please include a valid email')
            .isEmail()
            .normalizeEmail()
            .trim(),
        body('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
            .trim(),
    ];
};
