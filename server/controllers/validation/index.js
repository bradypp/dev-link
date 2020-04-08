const userRules = require('./userRules');
const profileRules = require('./profileRules');
const validate = require('./validate');

// TODO: Check every inputted field has the required validators/sanitizers either here, on schema or on form

const validation = validationRules => [validationRules, validate];

exports.signUp = validation(userRules.signUpRules);
exports.signIn = validation(userRules.signInRules);
exports.forgotPassword = validation(userRules.forgotPasswordRules);
exports.resetPassword = validation(userRules.resetPasswordRules);
exports.updatePassword = validation(userRules.updatePasswordRules);
exports.updateUser = validation(userRules.updateUserRules);
exports.createUpdateProfile = validation(profileRules.createUpdateProfileRules);
exports.experience = validation(profileRules.experienceRules);
exports.education = validation(profileRules.educationRules);
