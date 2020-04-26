import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// import { IoIosCheckmark } from 'react-icons/io';
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './CheckboxStyles';

const propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    value: PropTypes.bool,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    value: false,
    invalid: false,
    onChange: () => {},
};
// TODO: make it work & styling
const CheckBox = forwardRef(({ className, value, onChange, ...otherProps }, ref) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox
            value={value}
            onChange={event => onChange(event.target.value, event)}
            ref={ref}
            {...otherProps}
        />
        <StyledCheckbox value={value}>
            <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </StyledCheckbox>
    </CheckboxContainer>
));

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;
