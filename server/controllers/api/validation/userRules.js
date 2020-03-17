const { emailRules, nameRules } = require('./utils');

exports.updateNameRules = () => {
    return [nameRules];
};

exports.updateEmailRules = () => {
    return [emailRules];
};
