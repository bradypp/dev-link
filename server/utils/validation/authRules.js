const {
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
    emailRules,
    nameRules,
    fieldRequired,
} = require('./utils');

exports.signUpRules = () => {
    return [nameRules, emailRules, passwordRegexRules, passwordLengthRules, password2Rules];
};

exports.signInRules = () => {
    return [emailRules, fieldRequired('password', 'Password is required')];
};

exports.forgotPasswordRules = () => {
    return [emailRules];
};

exports.resetPasswordRules = () => {
    return [passwordRegexRules, passwordLengthRules, password2Rules];
};

exports.updatePasswordRules = () => {
    return [
        fieldRequired('current_password', 'Please enter your current password'),
        passwordRegexRules,
        passwordLengthRules,
        password2Rules,
    ];
};