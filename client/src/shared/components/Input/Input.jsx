import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'shared/components';
import { InputContainer, InputElement } from './InputStyles';

const propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.node]),
    height: PropTypes.number,
    fontSize: PropTypes.string,
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    value: undefined,
    type: 'text',
    icon: undefined,
    height: 3.2,
    fontSize: undefined,
    invalid: false,
    onChange: () => {},
};

// TODO: add loading prop & align it spinner to the right of the input if true?
const Input = forwardRef(({ icon, className, onChange, height, ...props }, ref) => (
    <InputContainer className={className} height={height}>
        {icon && typeof icon === 'string' ? <Icon type={icon} /> : icon}
        <InputElement
            hasIcon={!!icon}
            onChange={event => onChange(event.target.value, event)}
            height={height}
            ref={ref}
            {...props}
        />
    </InputContainer>
));

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
