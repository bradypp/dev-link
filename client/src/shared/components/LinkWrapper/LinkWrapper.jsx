import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from './LinkWrapperStyles';

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

const LinkWrapper = forwardRef(({ children, disabled, isWorking, to, className, onClick }, ref) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };
    return (
        <StyledLink
            to={to}
            className={className}
            onClick={handleClick}
            disabled={disabled || isWorking}
            ref={ref}>
            {children}
        </StyledLink>
    );
});

LinkWrapper.propTypes = propTypes;
LinkWrapper.defaultProps = defaultProps;

export default LinkWrapper;
