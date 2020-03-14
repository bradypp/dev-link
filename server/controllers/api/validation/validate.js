const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = {};
    errors.array().forEach(({ param, msg }) => {
        extractedErrors[param] = msg;
    });

    return res.status(400).json(extractedErrors);
};

module.exports = validate;
