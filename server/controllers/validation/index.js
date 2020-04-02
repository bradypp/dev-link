const userRules = require('./userRules');
const profileRules = require('./profileRules');
const validate = require('./validate');

const validation = validationRules => [validationRules, validate];

exports.signUp = validation(userRules.signUpRules);
exports.signIn = validation(userRules.signInRules);
exports.forgotPassword = validation(userRules.forgotPasswordRules);
exports.resetPassword = validation(userRules.resetPasswordRules);
exports.updatePassword = validation(userRules.updatePasswordRules);
exports.updateUser = validation(userRules.updateUserRules);
exports.createProfile = validation(profileRules.profileSanitizers);
exports.updateProfile = validation(profileRules.profileSanitizers);
exports.experience = validation(profileRules.experienceRules);
exports.education = validation(profileRules.educationRules);
