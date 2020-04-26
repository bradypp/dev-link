/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, ButtonText, ButtonSpinner } from 'shared/components';
import { StyledButton } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    backgroundColor: 'primary',
    borderColor: 'border1',
    color: 'textPrimary1',
    icon: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    isActive: false,
    onClick: () => {},
};

const Button = forwardRef(({ children, icon, disabled, isWorking, color, ...otherProps }, ref) => (
    <StyledButton
        disabled={disabled || isWorking}
        iconOnly={!children}
        ref={ref}
        color={color}
        {...otherProps}>
        {isWorking && <ButtonSpinner />}
        {!isWorking && icon && typeof icon === 'string' ? <Icon type={icon} /> : icon}
        {children && <ButtonText withPadding={icon || isWorking}>{children}</ButtonText>}
    </StyledButton>
));

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
