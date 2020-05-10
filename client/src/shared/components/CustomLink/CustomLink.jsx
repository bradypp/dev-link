import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, ButtonText, ButtonSpinner } from 'shared/components';
import { StyledLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        'link',
        'no-styles',
        'primary-darken',
        'primary-lighten',
        'bordered-fill',
        'bordered-inset',
        'text-darken',
        'text-lighten',
    ]),
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    iconSize: PropTypes.string,
    iconLocation: PropTypes.oneOf[('left', 'right')],
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    variant: 'link',
    backgroundColor: 'background1',
    borderColor: undefined,
    color: 'textPrimary1',
    icon: undefined,
    iconSize: undefined,
    iconLocation: 'left',
    isWorking: false,
    isActive: false,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    ({ children, icon, iconSize, iconLocation, isWorking, disabled, color, ...props }, ref) => (
        <StyledLink
            disabled={disabled || isWorking}
            ref={ref}
            color={color}
            iconSize={iconSize}
            iconLocation={iconLocation}
            {...props}>
            {isWorking && <ButtonSpinner />}
            {icon && typeof icon === 'string' ? <Icon type={icon} /> : icon}
            {!isWorking && children && (
                <ButtonText withPadding={isWorking || icon} iconLocation={iconLocation}>
                    {children}
                </ButtonText>
            )}
        </StyledLink>
    ),
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
