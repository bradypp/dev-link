import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { BaseLink } from './CustomLinkStyles';

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

const CustomLink = forwardRef(({ children, disabled, isWorking, to, className, onClick }, ref) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };
    return (
        <BaseLink
            to={to}
            className={className}
            onClick={handleClick}
            disabled={disabled || isWorking}
            ref={ref}>
            {children}
        </BaseLink>
    );
});

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
