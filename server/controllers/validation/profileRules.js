const { body } = require('express-validator');
const { fieldRequired, normalizeUrls } = require('./utils');

// TODO: Move sanitizers (link normalization) and validators to the frontend at place of input/on save to simplify backend validation

const fromDateRules = fieldRequired('from', 'From date is required')
    .isString()
    .withMessage('From date field needs to be a string')
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
    .withMessage('From date needs to be from before the to date');

const toDateRules = body('to', 'To date field needs to be a string')
    .if(body('to').exists())
    .isString();

const profileSanitizers = [
    normalizeUrls([
        'website',
        'socials.youtube',
        'socials.twitter',
        'socials.facebook',
        'socials.linkedin',
        'socials.instagram',
        'socials.custom',
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
    fieldRequired('type', 'Education type is required'),
    fieldRequired('field_of_study', 'Field of study is required'),
    fromDateRules,
    toDateRules,
];
