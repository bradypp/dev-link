import { setAlert } from 'redux/alerts';

// TODO
export const apiErrorHandler = (err, alertType = 'danger') => async dispatch => {
    if (process.env.NODE_ENV === 'development') console.error(err.response || err);

    if (err.response) {
        const error = err.response.data;
        if (Array.isArray(error)) {
            error.forEach(el => {
                dispatch(setAlert(el.message, alertType));
            });
        } else {
            dispatch(setAlert(error.message, alertType));
        }
    }
};

const isNilOrEmptyString = value => value === undefined || value === null || value === '';

export const validator = {
    match: (testFn, message = '') => (value, fieldValues) => !testFn(value, fieldValues) && message,

    required: () => value => isNilOrEmptyString(value) && 'This field is required',

    minLength: min => value =>
        !!value && value.length < min && `Must be at least ${min} characters`,

    maxLength: max => value => !!value && value.length > max && `Must be at most ${max} characters`,

    notEmptyArray: () => value =>
        Array.isArray(value) && value.length === 0 && 'Please add at least one item',

    email: () => value => !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

    url: () => value =>
        !!value &&
        // eslint-disable-next-line no-useless-escape
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
            value,
        ) &&
        'Must be a valid URL',
};

// fieldValidators example format: fieldValidators={
//     email: validator.email(),
//     title: [validator.required(), validator.maxLength(200)],
// }
// Each validator should return an error message if the conditions are satisfied
// An object of key-value pairs: {key: fieldValue, value: errorMessage} is returned
export const generateValidationErrors = (fieldValues, fieldValidators) => {
    const errors = {};

    Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
        [validators].flat().forEach(validator => {
            const errorMessage = validator(fieldValues[fieldName], fieldValues);
            if (errorMessage && !errors[fieldName]) {
                errors[fieldName] = errorMessage;
            }
        });
    });
    return errors;
};
