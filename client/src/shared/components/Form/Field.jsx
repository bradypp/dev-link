import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Input, TextArea, TextEditor, Select, Checkbox } from 'shared/components';
import { FieldContainer, FieldLabel, FieldTip, FieldError } from './FormStyles';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    error: undefined,
    name: undefined,
};

const generateField = FormComponent => {
    const FieldComponent = ({ className, label, tip, error, name, ...otherProps }) => {
        const fieldId = uniqueId('form-field-');

        return (
            <FieldContainer
                className={className}
                hasLabel={!!label}
                data-testid={name ? `form-field:${name}` : 'form-field'}>
                {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
                <FormComponent id={fieldId} invalid={!!error} name={name} {...otherProps} />
                {!error && tip && <FieldTip>{tip}</FieldTip>}
                {error && <FieldError>{error}</FieldError>}
            </FieldContainer>
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
};
