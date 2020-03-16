const { registerRules, loginRules } = require('./authRules');
const { postRules, postCommentRules } = require('./postsRules');
const { profileRules, experienceRules, educationRules } = require('./profileRules');
const validate = require('./validate');

const {
    REGISTER,
    LOGIN,
    POST,
    POST_COMMENT,
    PROFILE,
    EDUCATION,
    EXPERIENCE,
} = require('./validationTypes');

const validationRules = type => {
    switch (type) {
        case REGISTER:
            return registerRules();
        case LOGIN:
            return loginRules();
        case POST:
            return postRules();
        case POST_COMMENT:
            return postCommentRules();
        case PROFILE:
            return profileRules();
        case EXPERIENCE:
            return experienceRules();
        case EDUCATION:
            return educationRules();
        default:
            console.error(`No validation rules provided for ${type}`);
    }
};

const validation = type => {
    return [validationRules(type), validate];
};

module.exports = validation;
