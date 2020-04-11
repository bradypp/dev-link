/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledButton, ButtonText, ButtonSpinner } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    color: PropTypes.string,
    variant: PropTypes.string,
    Icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    lightenDarkenPercentage: PropTypes.number,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    color: 'primary',
    variant: 'primary',
    Icon: undefined,
    lightenDarkenPercentage: 0.05,
    type: 'button',
    disabled: false,
    isWorking: false,
    isActive: false,
    onClick: () => {},
};

const Button = forwardRef(
    (
        {
            children,
            color,
            variant,
            Icon,
            lightenDarkenPercentage,
            disabled,
            isWorking,
            onClick,
            className,
            type,
            isActive,
        },
        ref,
    ) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        return (
            <StyledButton
                className={className}
                onClick={handleClick}
                type={type}
                color={color}
                variant={variant}
                lightenDarkenPercentage={lightenDarkenPercentage}
                disabled={disabled || isWorking}
                isActive={isActive}
                iconOnly={!children}
                ref={ref}>
                {isWorking && <ButtonSpinner />}
                {Icon && <Icon className="icon" />}
                {children && <ButtonText withPadding={Icon || isWorking}>{children}</ButtonText>}
            </StyledButton>
        );
    },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
