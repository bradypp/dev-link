import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    disabled: false,
    isWorking: false,
    onClick: undefined,
};

const LinkWrapper = forwardRef(({ children, to, className, disabled, isWorking, onClick }, ref) => {
    const handleClick = e => {
        if (!disabled && !isWorking && onClick) {
            onClick(e);
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
