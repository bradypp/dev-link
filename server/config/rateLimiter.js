const rateLimit = require('express-rate-limit');
const AppError = require('../utils/appError');

const rateLimiter = (config = {}) => {
    const max = config.maxAttempts || 5;
    const windowMs = config.windowMinutes * 60 * 1000 || 60 * 60 * 1000;
    const message = config.message || 'Too many requests from this IP, please try again later!';
    const handler = (req, res, next) => next(new AppError(message, 429));

    return rateLimit({ max, windowMs, message, handler });
};

module.exports = rateLimiter;
