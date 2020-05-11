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

const LinkWrapper = forwardRef(({ children, to, className, disabled, isWorking, onClick }, ref) => {
    const handleClick = () => {
        if (!disabled && !isWorking && onClick) {
            onClick();
        }
    };
    return (
        <Link className={className} to={to} onClick={handleClick} disabled={disabled} ref={ref}>
            {children}
        </Link>
    );
});

LinkWrapper.propTypes = propTypes;
LinkWrapper.defaultProps = defaultProps;

export default LinkWrapper;
