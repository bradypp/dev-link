const { body } = require('express-validator');
const normalize = require('normalize-url');
const { fieldRequired, normalizeUrls, normalizeCustomSocials } = require('./utils');

// TODO: Move sanitizers (link normalization) and validators to the frontend at place of input/on save to simplify backend validation
// TODO: update for new model/frontend

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
    ]),
    body('socials.custom')
        .if(body('socials.custom').exists())
        .customSanitizer(value =>
            value.map(el => ({
                name: el.name,
                link: normalize(el.link, { forceHttps: true }),
            })),
        ),
];

const profileEmailRules = body('contact.email', 'Please enter a valid email')
    .if(body('contact.email').exists())
    .trim()
    .normalizeEmail()
    .isEmail();

// TODO: update should contain rules for fields that exists (e.g. contact.phone) and anything else that can be updated in this route
exports.createUpdateProfileRules = [profileEmailRules, profileSanitizers];

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
