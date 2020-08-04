import * as Yup from 'yup';

const validators = {
    required: (errorMessage = 'Field is required') =>
        Yup.string()
            .trim()
            .required(errorMessage),
    date: (errorMessage = 'Field is required') =>
        Yup.string()
            .matches(
                /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
                'Must be in the format of MM/DD/YYYY',
            )
            .required(errorMessage),
    name: Yup.string()
        .trim()
        .min(2, 'Name is too short!')
        .max(50, 'Name is too long!')
        .required('Name is required'),
    username: Yup.string()
        .trim()
        .min(2, 'Username is too short!')
        .max(50, 'Username is too long!')
        .matches(/^\s*\S+\s*$/g, 'Username must not contain any spaces')
        .required('Username is required'),
    password: Yup.string()
        .trim()
        .min(8, 'Password must contain at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{8,}$/g,
            'Password must contain a mix of letters, numbers and symbols',
        )
        .required('Password is required'),
    password2: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    email: Yup.string()
        .trim()
        .email('Please enter a valid email address')
        .required('Email is required')
        .lowercase(),
    to: Yup.string()
        .matches(
            /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
            'Must be in the format of DD/MM/YYYY',
        )
        .when('current', {
            is: false,
            then: Yup.string().required('To date is required'),
        }),
};

export default validators;
