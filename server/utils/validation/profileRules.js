const { fieldRequired, fromDateRules } = require('./utils');

exports.profileRules = [
    fieldRequired('status', 'Status is required'),
    fieldRequired('skills', 'Skills are required'),
];

exports.experienceRules = [
    fieldRequired('title', 'Title is required'),
    fieldRequired('company', 'Company is required'),
    fromDateRules,
];

exports.educationRules = [
    fieldRequired('school', 'School is required'),
    fieldRequired('degree', 'Degree is required'),
    fieldRequired('field_of_study', 'Field of study is required'),
    fromDateRules,
];
