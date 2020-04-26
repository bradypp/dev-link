import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { useField } from 'formik';
import { FieldContainer, FieldLabel, FieldTip, FieldError } from './FormStyles';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
};

/* TODO: create variations for Checkbox (with description to the right)
and Radio (with description to the right & multiple radio fields allowed under the label) */
const generateField = FormComponent => {
    const FieldComponent = ({ className, label, tip, ...props }) => {
        const [field, meta, helpers] = useField(props);
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
                    // Keep onChange prop after {...field} to overwrite field.onChange which requires the event object
                    onChange={value => helpers.setValue(value)}
                />
                {meta.error && meta.touched ? (
                    <FieldError>{meta.error}</FieldError>
                ) : (
                    tip && <FieldTip>{tip}</FieldTip>
                )}
            </FieldContainer>
        );
    };

    FieldComponent.propTypes = propTypes;
    FieldComponent.defaultProps = defaultProps;

    return FieldComponent;
};

export default generateField;
