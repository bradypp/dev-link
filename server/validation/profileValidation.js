const { body } = require('express-validator');

exports.profileValidationRules = () => {
    return [
        body('status', 'Status is required')
            .notEmpty()
            .trim(),
        body('skills', 'Skills are required')
            .notEmpty()
            .trim(),
    ];
};
