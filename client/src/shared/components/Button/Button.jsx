/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledButton, ButtonText, ButtonSpinner } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    textColor: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    backgroundColor: undefined,
    borderColor: undefined,
    textColor: undefined,
    icon: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    isActive: false,
    onClick: () => {},
};

const Button = forwardRef(({ children, icon, disabled, isWorking, ...otherProps }, ref) => (
    <StyledButton disabled={disabled || isWorking} iconOnly={!children} ref={ref} {...otherProps}>
        {isWorking && <ButtonSpinner />}
        {icon && icon}
        {children && <ButtonText withPadding={icon || isWorking}>{children}</ButtonText>}
    </StyledButton>
));

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
