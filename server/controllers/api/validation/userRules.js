const { updateEmailRules, updateNameRules, updateActiveStatusRules } = require('./utils');

exports.updateUserRules = () => {
    return [updateNameRules, updateEmailRules, updateActiveStatusRules];
};
