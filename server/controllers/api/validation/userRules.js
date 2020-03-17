const { emailRules, nameRules } = require('./utils');

exports.updateMeRules = () => {
    return [nameRules, emailRules];
};
