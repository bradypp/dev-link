import * as Yup from 'yup';

const validators = {
    required: (errorMessage = 'Field is required') =>
        Yup.string()
            .trim()
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
        .matches(/^\s*\S+\s*$/g, "Username mustn't contain any spaces")
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
        .required('Email is required'),
};

export default validators;
