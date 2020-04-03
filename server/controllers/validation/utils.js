const { body } = require('express-validator');
const normalize = require('normalize-url');

exports.fieldRequired = (field, message = 'Field required') => body(field, message).notEmpty();

exports.normalizeUrls = fields =>
    fields.map(field =>
        body(field)
            .if(body(field).exists())
            .customSanitizer(value => normalize(value, { forceHttps: true })),
    );

exports.sanitizeArrayOfStrings = field =>
    body(field)
        .if(body(field).exists())
        .isArray()
        .bail()
        .withMessage(`${field} field must be an array`)
        .customSanitizer(array => array.map(el => el.trim()));

exports.sanitizeArrayOfObjects = field =>
    body(field)
        .if(body(field).exists())
        .isArray()
        .bail()
        .withMessage(`${field} field must be an array`)
        .customSanitizer(array =>
            array.map(obj => {
                const newObj = {};
                Object.keys(obj).forEach(key => {
                    newObj[key] = obj[key].trim();
                });
                return newObj;
            }),
        );
