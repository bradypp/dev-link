import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './ButtonWrapperStyles';

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

const ButtonWrapper = forwardRef(
    ({ children, disabled, isWorking, onClick, className, type }, ref) => {
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
                disabled={disabled || isWorking}
                ref={ref}>
                {children}
            </StyledButton>
        );
    },
);

ButtonWrapper.propTypes = propTypes;
ButtonWrapper.defaultProps = defaultProps;

export default ButtonWrapper;
