import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { SimpleLinkWrapper } from './SimpleCustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    to: undefined,
    className: undefined,
    children: undefined,
    disabled: false,
    isWorking: false,
    onClick: undefined,
};

const SimpleCustomLink = forwardRef(
    ({ children, disabled, isWorking, to, className, onClick }, ref) => {
        const handleClick = () => {
            if (!disabled && onClick) {
                onClick();
            }
        };
        return (
            <SimpleLinkWrapper
                to={to}
                className={className}
                onClick={handleClick}
                disabled={disabled || isWorking}
                ref={ref}>
                {children}
            </SimpleLinkWrapper>
        );
    },
);

SimpleCustomLink.propTypes = propTypes;
SimpleCustomLink.defaultProps = defaultProps;

export default SimpleCustomLink;
