const validate = require('./validate');
const { registerValidationRules, loginValidationRules } = require('./authValidation');
const { profileValidationRules } = require('./profileValidation');

module.exports = {
    validate,
    registerValidationRules,
    loginValidationRules,
    profileValidationRules,
};
