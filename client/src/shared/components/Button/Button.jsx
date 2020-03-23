import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledSpinner, Text } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    styles: PropTypes.oneOf(['base', 'default', 'bordered']),
    type: PropTypes.oneOf(['button', 'submit']),
    variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary', 'white']),
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    styles: 'default',
    variant: 'primary',
    Icon: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    onClick: () => {},
};

const Button = forwardRef(
    ({ children, variant, Icon, disabled, isWorking, onClick, className, type, styles }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        return (
            <StyledButton
                className={className}
                onClick={handleClick}
                styles={styles}
                type={type}
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
