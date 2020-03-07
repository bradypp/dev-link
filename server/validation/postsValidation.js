const { body } = require('express-validator');

exports.postValidationRules = () => {
    return [
        body('text', 'Text is required')
            .notEmpty(),
    ];
};

exports.postCommentValidationRules = () => {
    return [
        body('text', 'Text is required')
            .notEmpty(),
    ];
};
