const {
    updateEmailRules,
    updateNameRules,
    updateActiveStatusRules,
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
    emailRules,
    nameRules,
    fieldRequired,
} = require('./utils');

exports.signUpRules = [
    nameRules,
    emailRules,
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
];

exports.signInRules = [emailRules, fieldRequired('password', 'Password is required')];

exports.forgotPasswordRules = [emailRules];

exports.resetPasswordRules = [passwordRegexRules, passwordLengthRules, password2Rules];

exports.updatePasswordRules = [
    fieldRequired('current_password', 'Please enter your current password'),
    passwordRegexRules,
    passwordLengthRules,
    password2Rules,
];

exports.updateUserRules = [updateNameRules, updateEmailRules, updateActiveStatusRules];
