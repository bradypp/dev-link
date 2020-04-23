const { body } = require('express-validator');
const normalize = require('normalize-url');
const { normalizeUrls } = require('./utils');

// TODO: Go through the model and update required validation
// TODO: should have normalization for all links (ie portfolio links)
// TODO: socials needs to be updated for new data format
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

const profileContactEmailRules = body('contact.email', 'Please enter a valid email')
    .if(body('contact.email').exists())
    .trim()
    .normalizeEmail()
    .isEmail();

exports.updateProfileRules = [profileContactEmailRules, profileSanitizers];
