const {
    signUpRules,
    signInRules,
    forgotPasswordRules,
    resetPasswordRules,
    updatePasswordRules,
} = require('./authRules');
const { postRules, postCommentRules } = require('./postsRules');
const { updateUserRules } = require('./userRules');
const { profileRules, experienceRules, educationRules } = require('./profileRules');
const validate = require('./validate');

const {
    SIGN_UP,
    SIGN_IN,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    UPDATE_PASSWORD,
    UPDATE_ME,
    POST,
    POST_COMMENT,
    PROFILE,
    EDUCATION,
    EXPERIENCE,
} = require('./validationTypes');

const validationRules = type => {
    switch (type) {
        case SIGN_UP:
            return signUpRules();
        case SIGN_IN:
            return signInRules();
        case FORGOT_PASSWORD:
            return forgotPasswordRules();
        case RESET_PASSWORD:
            return resetPasswordRules();
        case UPDATE_PASSWORD:
            return updatePasswordRules();
        case UPDATE_ME:
            return updateUserRules();
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
