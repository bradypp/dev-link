const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    errors.name = 'ExpressValidationErrors';
    next(errors);
};

module.exports = validate;
