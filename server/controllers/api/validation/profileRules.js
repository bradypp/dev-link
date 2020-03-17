const { fieldRequired, fromDateRules } = require('./utils');

exports.profileRules = () => {
    return [
        fieldRequired('status', 'Status is required'),
        fieldRequired('skills', 'Skills are required'),
    ];
};

exports.experienceRules = () => {
    return [
        fieldRequired('title', 'Title is required'),
        fieldRequired('company', 'Company is required'),
        fromDateRules,
    ];
};

exports.educationRules = () => {
    return [
        fieldRequired('school', 'School is required'),
        fieldRequired('degree', 'Degree is required'),
        fieldRequired('field_of_study', 'Field of study is required'),
        fromDateRules,
    ];
};
