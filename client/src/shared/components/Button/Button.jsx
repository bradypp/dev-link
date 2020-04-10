/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper, ButtonText, ButtonSpinner } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    color: PropTypes.string,
    Icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    color: 'primary',
    Icon: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    onClick: () => {},
};

const Button = forwardRef(
    ({ children, color, Icon, disabled, isWorking, onClick, className, type }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        return (
            <ButtonWrapper
                className={className}
                onClick={handleClick}
                type={type}
                color={color}
                disabled={disabled || isWorking}
                isWorking={isWorking}
                iconOnly={!children}
                ref={ref}>
                {isWorking && <ButtonSpinner />}
                {Icon && <Icon className="icon" />}
                {children && <ButtonText withPadding={Icon || isWorking}>{children}</ButtonText>}
            </ButtonWrapper>
        );
    },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
