import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledLink, Text } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    styles: PropTypes.oneOf(['base', 'default', 'bordered']),
    variant: PropTypes.oneOf(['primary', 'success', 'danger', 'secondary', 'white']),
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    to: undefined,
    className: undefined,
    styles: 'default',
    children: undefined,
    variant: 'primary',
    Icon: undefined,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    ({ children, variant, Icon, disabled, to, className, onClick, styles }, ref) => {
        return (
            <StyledLink
                to={to}
                className={className}
                styles={styles}
                variant={variant}
                onClick={onClick}
                disabled={disabled}
                iconOnly={!children}
                ref={ref}>
                {Icon && <Icon />}
                {children && <Text withPadding={Icon}>{children}</Text>}
            </StyledLink>
        );
    },
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
