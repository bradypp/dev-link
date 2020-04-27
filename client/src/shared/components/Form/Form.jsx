import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import FormField from './FormField';
import FormButtons from './FormButtons';
import { FormikForm } from './FormStyles';

const propTypes = {
    validateOnBlur: PropTypes.bool,
};

const defaultProps = {
    validateOnBlur: false,
};

const Form = props => <Formik {...props} />;

Form.Element = props => <FormikForm noValidate {...props} />;

Form.Field = FormField;
Form.Buttons = FormButtons;

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
