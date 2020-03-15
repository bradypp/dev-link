const { validationResult } = require('express-validator');
const AppError = require('../../../utils/appError');

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().forEach(err => {
        const error = new AppError(err.msg, 400);
        if (process.env.NODE_ENV === 'development') {
            extractedErrors.push({
                status: error.status,
                error,
                message: error.message,
                stack: error.stack,
            });
        } else if (process.env.NODE_ENV === 'production') {
            extractedErrors.push({
                status: error.status,
                message: error.message,
            });
        }
    });

    return res.status(400).json(extractedErrors);
};

module.exports = validationHandler;
