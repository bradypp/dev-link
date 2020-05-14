/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

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
    ({ children, className, type, disabled, isWorking, onClick }, ref) => {
        const handleClick = e => {
            if (!disabled && !isWorking) {
                onClick(e);
            }
        };

        return (
            <button
                className={className}
                type={type}
                onClick={handleClick}
                disabled={disabled}
                ref={ref}>
                {children}
            </button>
        );
    },
);

ButtonWrapper.propTypes = propTypes;
ButtonWrapper.defaultProps = defaultProps;

export default ButtonWrapper;
