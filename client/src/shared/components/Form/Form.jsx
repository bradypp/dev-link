import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { generateValidationErrors } from 'shared/utils';
import { mapValues } from 'lodash';
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

const fieldWrapper = FieldComponent => ({ name, ...otherProps }) => (
    <FormikField name={name} {...otherProps}>
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

// Wraps all fields from './Field' with the formik Field component for general use (e.g. Form.Field.Input)
Form.Field = mapValues(Field, fieldWrapper);
Form.Field.Checkbox = ({ name, ...otherProps }) => (
    <FormikField
        name={name}
        {...otherProps}
        render={({ field, form: { touched, errors, setFieldValue } }) => (
            <input
                type="checkbox"
                checked={field.value}
                {...field}
                {...otherProps}
                name={name}
                error={touched[name] && errors[name]}
                onChange={value => setFieldValue(name, value)}
            />
        )}
    />
);

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
