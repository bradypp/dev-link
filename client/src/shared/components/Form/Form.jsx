import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { generateValidationErrors } from 'shared/utils';
import Field from './Field';

const propTypes = {
    validate: PropTypes.func,
    validations: PropTypes.object,
    validateOnBlur: PropTypes.bool,
};

const defaultProps = {
    validate: undefined,
    validations: undefined,
    validateOnBlur: false,
};

// TODO: test validate on blur default prop for StyledForm
const Form = ({ validate, validations, validateOnBlur, ...otherProps }) => (
    <Formik
        validate={values => {
            if (validate) return validate(values);
            if (validations) return generateValidationErrors(values, validations);
            return null;
        }}
        validateOnBlur={validateOnBlur}
        {...otherProps}
    />
);

Form.Element = props => <FormikForm noValidate {...props} />;

const fieldWrapper = FieldComponent => ({ name, validate, ...otherProps }) => (
    <FormikField name={name} validate={validate}>
        {({ field, form: { touched, errors, setFieldValue } }) => (
            <FieldComponent
                {...field}
                {...otherProps}
                name={name}
                error={touched[name] && errors[name]}
                onChange={value => setFieldValue(name, value)}
            />
        )}
    </FormikField>
);

Form.Input = fieldWrapper(Field.Input);
// Form.Select = fieldWrapper(Field.Select);
Form.TextArea = fieldWrapper(Field.TextArea);
Form.TextEditor = fieldWrapper(Field.TextEditor);
// Form.DatePicker = fieldWrapper(Field.DatePicker);

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
