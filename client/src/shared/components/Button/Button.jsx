/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, ButtonText, ButtonSpinner } from 'shared/components';
import { StyledButton } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.oneOf([
        'no-styles',
        'primary-darken',
        'primary-lighten',
        'bordered-fill',
        'bordered-inset',
    ]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    iconLocation: PropTypes.string,
    iconSize: PropTypes.string,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    backgroundColor: 'background1',
    borderColor: undefined,
    color: 'textPrimary1',
    variant: 'primary-darken',
    icon: undefined,
    iconLocation: 'left',
    iconSize: '1.8rem',
    type: 'button',
    disabled: false,
    isWorking: false,
    isActive: false,
    onClick: () => {},
};

const Button = forwardRef(
    (
        { children, icon, iconLocation, iconSize, disabled, isWorking, color, isActive, ...props },
        ref,
    ) => {
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
            <StyledButton
                disabled={disabled || isWorking}
                iconOnly={!children}
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
            </StyledButton>
        );
    },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
