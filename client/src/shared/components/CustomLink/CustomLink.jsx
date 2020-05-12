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
        'text-color',
    ]),
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    iconSize: PropTypes.string,
    iconLocation: PropTypes.string,
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
    ({ children, icon, iconSize, iconLocation, isWorking, disabled, color, ...props }, ref) => {
        const renderedIcon = (
            <>
                {!isWorking && icon && typeof icon === 'string' ? (
                    <Icon size={iconSize} type={icon} />
                ) : (
                    icon
                )}
            </>
        );
        return (
            <StyledLink
                disabled={disabled || isWorking}
                ref={ref}
                color={color}
                iconSize={iconSize}
                iconLocation={iconLocation}
                {...props}>
                {isWorking && <ButtonSpinner />}
                {iconLocation === 'left' && renderedIcon}
                {children && (
                    <ButtonText iconLocation={iconLocation} withPadding={icon || isWorking}>
                        {children}
                    </ButtonText>
                )}
                {iconLocation === 'right' && renderedIcon}
            </StyledLink>
        );
    },
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
