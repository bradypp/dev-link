const { body } = require('express-validator');

exports.postRules = () => {
    return [body('text', 'Text is required').notEmpty()];
};

exports.postCommentRules = () => {
    return [body('text', 'Text is required').notEmpty()];
};
