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
    iconSize: PropTypes.string,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    height: PropTypes.string,
    width: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    backgroundColor: 'primary',
    borderColor: 'border1',
    color: 'textPrimary1',
    icon: undefined,
    iconSize: '1.8rem',
    type: 'button',
    disabled: false,
    isWorking: false,
    isActive: false,
    onClick: () => {},
};

const Button = forwardRef(
    ({ children, icon, iconSize, disabled, isWorking, color, ...props }, ref) => (
        <StyledButton
            disabled={disabled || isWorking}
            iconOnly={!children}
            ref={ref}
            color={color}
            iconSize={iconSize}
            {...props}>
            {isWorking && <ButtonSpinner />}
            {!isWorking && icon && typeof icon === 'string' ? (
                <Icon size={iconSize} type={icon} />
            ) : (
                icon
            )}
            {!isWorking && children && (
                <ButtonText withPadding={icon || isWorking}>{children}</ButtonText>
            )}
        </StyledButton>
    ),
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
