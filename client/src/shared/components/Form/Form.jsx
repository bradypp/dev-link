import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm } from 'formik';
import { Input, TextArea, TextEditor, Select } from 'shared/components';
import generateField from './generateField';

const propTypes = {
    validateOnBlur: PropTypes.bool,
};

const defaultProps = {
    validateOnBlur: false,
};

const Form = props => <Formik {...props} />;

Form.Element = props => <FormikForm noValidate {...props} />;

Form.Field = {
    Input: generateField(Input),
    Select: generateField(Select),
    TextArea: generateField(TextArea),
    TextEditor: generateField(TextEditor),
    // Checkbox: generateField(Checkbox),
    // Radio: generateField(Radio),
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
