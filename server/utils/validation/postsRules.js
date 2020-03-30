const { fieldRequired } = require('./utils');

exports.postRules = [fieldRequired('text', 'Text is required')];

exports.postCommentRules = [fieldRequired('text', 'Text is required')];
