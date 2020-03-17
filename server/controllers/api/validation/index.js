const {
    registerRules,
    loginRules,
    forgotPasswordRules,
    resetPasswordRules,
    updatePasswordRules,
} = require('./authRules');
const { postRules, postCommentRules } = require('./postsRules');
const { profileRules, experienceRules, educationRules } = require('./profileRules');
const validate = require('./validate');

const {
    REGISTER,
    LOGIN,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    UPDATE_PASSWORD,
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
        case FORGOT_PASSWORD:
            return forgotPasswordRules();
        case RESET_PASSWORD:
            return resetPasswordRules();
        case UPDATE_PASSWORD:
            return updatePasswordRules();
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
