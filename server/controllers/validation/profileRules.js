const { fieldRequired, normalizeUrls, sanitizeArray } = require('./utils');

const fromDateRules = fieldRequired(
    'from',
    'From date is required and needs to be from the past',
).custom((value, { req }) => (req.body.to ? value < req.body.to : true));

const profileSanitizers = [
    sanitizeArray('skills'),
    normalizeUrls([
        'website',
        'socials.youtube',
        'socials.twitter',
        'socials.facebook',
        'socials.linkedin',
        'socials.instagram',
    ]),
];

exports.createProfileRules = [
    fieldRequired('status', 'Status is required'),
    fieldRequired('skills', 'Skills are required'),
    profileSanitizers,
];

exports.updateProfileRules = profileSanitizers;

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
