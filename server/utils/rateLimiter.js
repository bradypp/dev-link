const rateLimit = require('express-rate-limit');

const rateLimiter = (
    config = {
        maxAttempts: 5,
        windowMinutes: 15,
        message: 'Too many requests from this IP, please try again later!',
    },
) => {
    const { maxAttempts, windowMinutes, message } = config;
    return rateLimit({
        max: maxAttempts,
        windowMs: windowMinutes * 60 * 1000,
        message,
    });
};

module.exports = rateLimiter;
