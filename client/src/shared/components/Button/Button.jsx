import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText } from 'shared/styles';
import { BaseButton, StyledSpinner } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'submit']),
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
            <BaseButton
                className={className}
                onClick={handleClick}
                type={type}
                color={color}
                disabled={disabled || isWorking}
                isWorking={isWorking}
                iconOnly={!children}
                ref={ref}>
                {isWorking && <StyledSpinner size={25} />}
                {Icon && <Icon className="icon" />}
                {children && <ButtonText withPadding={Icon}>{children}</ButtonText>}
            </BaseButton>
        );
    },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
