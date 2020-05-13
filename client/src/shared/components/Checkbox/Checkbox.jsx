import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
// import { Field } from 'formik';
import { FaCheck } from 'react-icons/fa';
import { CheckboxContainer, InputComponent, StyledLabel, StyledCheckbox } from './CheckboxStyles';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
    checked: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    disabled: PropTypes.bool,
};

const defaultProps = {
    className: undefined,
    name: undefined,
    label: undefined,
    value: false,
    checked: false,
    type: 'checkbox',
    onChange: () => {},
    id: undefined,
    disabled: false,
};

const Checkbox = forwardRef(
    ({ className, checked, onChange, label, id: propsId, disabled, ...props }, ref) => {
        const fieldId = propsId || uniqueId('form-field-');
        return (
            <CheckboxContainer className={className}>
                <InputComponent
                    {...props}
                    disabled={disabled}
                    id={fieldId}
                    onChange={event => onChange(!!event.target.value, event)}
                    ref={ref}
                />
                <StyledLabel htmlFor={fieldId} disabled={disabled}>
                    <StyledCheckbox checked={checked} disabled={disabled}>
                        <FaCheck />
                    </StyledCheckbox>
                    {label && label}
                </StyledLabel>
            </CheckboxContainer>
        );
    },
);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
