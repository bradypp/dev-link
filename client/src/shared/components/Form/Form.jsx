import React from 'react';
import PropTypes from 'prop-types';
import { Formik, FieldArray } from 'formik';
import Field from './Field';
import FormButtons from './FormButtons';
import {
    FormikForm,
    FieldContainer,
    FlexContainer,
    FieldLabel,
    FieldError,
    FieldTip,
} from './FormStyles';

const propTypes = {
    validateOnBlur: PropTypes.bool,
};

const defaultProps = {
    validateOnBlur: false,
};

const Form = props => <Formik {...props} />;

Form.Element = props => <FormikForm noValidate {...props} />;

Form.Field = Field;
Form.FieldArray = FieldArray;
Form.FieldContainer = FieldContainer;
Form.FieldLabel = FieldLabel;
Form.FieldError = FieldError;
Form.FieldTip = FieldTip;
Form.Buttons = FormButtons;
Form.Flex = FlexContainer;

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
