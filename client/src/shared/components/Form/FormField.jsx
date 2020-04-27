import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field } from 'formik';
import { Input, TextArea, TextEditor, Select } from 'shared/components';
import { FieldContainer, FieldLabel, FieldTip, FieldError } from './FormStyles';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    submitOnChange: PropTypes.bool,
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
    submitOnChange: false,
};

/* TODO: create variations for Checkbox (with description to the right)
and Radio (with description to the right & multiple radio fields allowed under the label) */
const generateField = FormComponent => {
    const FieldComponent = ({ className, label, tip, submitOnChange, name, ...props }) => {
        return (
            <Field name={name}>
                {({ field, form, meta }) => {
                    const fieldId = uniqueId('form-field-');
                    return (
                        <FieldContainer
                            className={className}
                            hasLabel={!!label}
                            data-testid={field.name ? `form-field:${field.name}` : 'form-field'}>
                            {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
                            <FormComponent
                                {...field}
                                {...props}
                                id={fieldId}
                                invalid={meta.error && meta.touched}
                                onChange={value => {
                                    form.setFieldValue(name, value);
                                    if (submitOnChange) form.submitForm();
                                }}
                            />
                            {meta.error && meta.touched ? (
                                <FieldError>{meta.error}</FieldError>
                            ) : (
                                tip && <FieldTip>{tip}</FieldTip>
                            )}
                        </FieldContainer>
                    );
                }}
            </Field>
        );
    };

    FieldComponent.propTypes = propTypes;
    FieldComponent.defaultProps = defaultProps;

    return FieldComponent;
};

export default {
    Input: generateField(Input),
    Select: generateField(Select),
    TextArea: generateField(TextArea),
    TextEditor: generateField(TextEditor),
    // Checkbox: generateField(Checkbox),
    // Radio: generateField(Radio),
};
