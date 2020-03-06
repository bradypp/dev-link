const validate = require('./validate');
const { registerValidationRules, loginValidationRules } = require('./authValidation');
const { postValidationRules } = require('./postsValidation');
const {
    profileValidationRules,
    experienceValidationRules,
    educationValidationRules,
} = require('./profileValidation');

module.exports = {
    validate,
    registerValidationRules,
    loginValidationRules,
    profileValidationRules,
    experienceValidationRules,
    educationValidationRules,
    postValidationRules,
};
