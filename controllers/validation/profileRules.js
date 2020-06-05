const { body } = require('express-validator');
const normalize = require('normalize-url');
const { normalizeUrls } = require('./utils');

exports.updateProfileRules = [
    body('socials')
        .if(body('socials').exists())
        .customSanitizer(value => {
            if (value.length > 0) {
                return value.map(el => ({
                    name: el.name,
                    value: normalize(el.value, { forceHttps: true }),
                }));
            }
            return [];
        }),
];

exports.updatePortfolioRules = [normalizeUrls(['repo', 'demo'])];
