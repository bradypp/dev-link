const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validateExperienceInput(data) {
    let { school, degree, field_of_study, from } = data;
    const errors = {};

    school = !isEmpty(school) ? school : '';
    degree = !isEmpty(degree) ? degree : '';
    field_of_study = !isEmpty(field_of_study) ? field_of_study : '';
    from = !isEmpty(from) ? from : '';

    if (validator.isEmpty(school)) {
        errors.school = 'School field is required';
    }

    if (validator.isEmpty(degree)) {
        errors.degree = 'Degree field is required';
    }

    if (validator.isEmpty(field_of_study)) {
        errors.field_of_study = 'Field of study field is required';
    }

    if (validator.isEmpty(from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
