import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledSpinner, Text } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary', 'empty']),
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    variant: 'primary',
    Icon: undefined,
    disabled: false,
    isWorking: false,
    onClick: () => {},
};

const Button = forwardRef(
    ({ children, variant, Icon, disabled, isWorking, onClick, className }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        return (
            <StyledButton
                className={className}
                onClick={handleClick}
                variant={variant}
                disabled={disabled || isWorking}
                isWorking={isWorking}
                iconOnly={!children}
                ref={ref}>
                {isWorking && <StyledSpinner size={25} />}
                {Icon && <Icon />}
                {children && <Text withPadding={isWorking || Icon}>{children}</Text>}
            </StyledButton>
        );
    },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
