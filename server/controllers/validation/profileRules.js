const { body } = require('express-validator');
const { fieldRequired, normalizeUrls, sanitizeArrayOfStrings } = require('./utils');

const fromDateRules = fieldRequired('from', 'From date is required')
    .isString()
    .withMessage('From date field needs to be a string')
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    .withMessage('From date needs to be from before the to date');

const toDateRules = body('to', 'To date field needs to be a string')
    .if(body('to').exists())
    .isString();

const profileSanitizers = [
    sanitizeArrayOfStrings('skills'),
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
    toDateRules,
];

exports.educationRules = [
    fieldRequired('school', 'School is required'),
    fieldRequired('degree', 'Degree is required'),
    fieldRequired('field_of_study', 'Field of study is required'),
    fromDateRules,
    toDateRules,
];
