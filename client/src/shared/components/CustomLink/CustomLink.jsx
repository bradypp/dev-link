import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, ButtonText, ButtonSpinner } from 'shared/components';
import { StyledLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.node]),
    iconSize: PropTypes.string,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    variant: 'link',
    backgroundColor: undefined,
    borderColor: undefined,
    color: undefined,
    icon: undefined,
    iconSize: undefined,
    isWorking: false,
    isActive: false,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    ({ children, icon, iconSize, isWorking, disabled, color, ...props }, ref) => (
        <StyledLink
            disabled={disabled || isWorking}
            ref={ref}
            color={color}
            iconSize={iconSize}
            {...props}>
            {isWorking && <ButtonSpinner />}
            {!isWorking && icon && typeof icon === 'string' ? <Icon type={icon} /> : icon}
            {!isWorking && children && (
                <ButtonText withPadding={icon || isWorking}>{children}</ButtonText>
            )}
        </StyledLink>
    ),
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
