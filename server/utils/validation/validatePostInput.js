const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

const validatePostInput = data => {
    let { text } = data;
    const errors = {};

    text = !isEmpty(text) ? text : '';

    if (!validator.isLength(text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if (validator.isEmpty(text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validatePostInput;
