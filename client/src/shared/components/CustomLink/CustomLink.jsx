import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText } from 'shared/styles';
import { BaseLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    to: undefined,
    className: undefined,
    children: undefined,
    color: 'primary',
    Icon: undefined,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    ({ children, color, Icon, disabled, to, className, onClick }, ref) => {
        const handleClick = () => {
            if (!disabled && onClick) {
                onClick();
            }
        };
        return (
            <BaseLink
                to={to}
                className={className}
                color={color}
                onClick={handleClick}
                disabled={disabled}
                ref={ref}>
                {Icon && <Icon />}
                {children && <ButtonText withPadding={Icon}>{children}</ButtonText>}
            </BaseLink>
        );
    },
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
