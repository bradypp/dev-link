const validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateExperienceInput(data) {
    let { school, degree, fieldofstudy, from } = data;
    const errors = {};

    school = !isEmpty(school) ? school : '';
    degree = !isEmpty(degree) ? degree : '';
    fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : '';
    from = !isEmpty(from) ? from : '';

    if (validator.isEmpty(school)) {
        errors.school = 'School field is required';
    }

    if (validator.isEmpty(degree)) {
        errors.degree = 'Degree field is required';
    }

    if (validator.isEmpty(fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
    }

    if (validator.isEmpty(from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
