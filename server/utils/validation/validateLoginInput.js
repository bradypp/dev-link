const validator = require('validator');
const isEmpty = require('../isEmpty');

const validateLoginInput = data => {
    let { email, password } = data;
    const errors = {};

    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (!validator.isEmail(email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(email)) {
        errors.email = 'Email is required';
    }

    if (validator.isEmpty(password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validateLoginInput;
