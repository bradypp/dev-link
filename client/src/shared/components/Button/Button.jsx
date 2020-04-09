import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { BaseButton } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    onClick: () => {},
};

const Button = forwardRef(({ children, disabled, isWorking, onClick, className, type }, ref) => {
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
            disabled={disabled || isWorking}
            ref={ref}>
            {children}
        </BaseButton>
    );
});

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
