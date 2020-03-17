const { fieldRequired } = require('./utils');

exports.postRules = () => {
    return [fieldRequired('text', 'Text is required')];
};

exports.postCommentRules = () => {
    return [fieldRequired('text', 'Text is required')];
};
