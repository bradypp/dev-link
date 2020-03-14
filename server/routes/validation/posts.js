const { body } = require('express-validator');
const validate = require('./validate');

exports.postValidation = () => {
    return [[body('text', 'Text is required').notEmpty()], validate];
};

exports.postCommentValidation = () => {
    return [[body('text', 'Text is required').notEmpty()], validate];
};
