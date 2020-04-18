import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, InputElement } from './InputStyles';

const propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.node]),
    height: PropTypes.number,
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    value: undefined,
    icon: undefined,
    height: 3.2,
    invalid: false,
    onChange: () => {},
};

const Input = forwardRef(({ icon: Icon, className, height, ...otherProps }, ref) => (
    <InputContainer className={className} height={height}>
        {Icon && <Icon className="icon" />}
        <InputElement hasIcon={!!Icon} height={height} ref={ref} {...otherProps} />
    </InputContainer>
));

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
