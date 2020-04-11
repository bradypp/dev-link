import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

const CustomLinkWrapper = forwardRef(
    ({ children, disabled, isWorking, to, className, onClick }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking && onClick) {
                onClick();
            }
        };
        return (
            <Link to={to} className={className} onClick={handleClick} ref={ref}>
                {children}
            </Link>
        );
    },
);

CustomLinkWrapper.propTypes = propTypes;
CustomLinkWrapper.defaultProps = defaultProps;

export default CustomLinkWrapper;
