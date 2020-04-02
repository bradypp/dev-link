const { body } = require('express-validator');
const normalize = require('normalize-url');

exports.fieldRequired = (field, message = 'Field required') => body(field, message).notEmpty();

exports.normalizeUrls = fields =>
    fields.map(field =>
        body(field)
            .if(body(field).exists())
            .customSanitizer(value => normalize(value, { forceHttps: true })),
    );

exports.sanitizeArray = field =>
    body(field)
        .if(body(field).exists())
        .customSanitizer(array => array.map(el => el.trim()));
