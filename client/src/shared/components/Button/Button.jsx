import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText } from 'shared/styles';
import { BaseButton, PrimaryButton, BorderedButton, StyledSpinner } from './ButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.oneOf(['base', 'primary', 'bordered']),
    type: PropTypes.oneOf(['button', 'submit']),
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'grey']),
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    variant: 'primary',
    color: 'primary',
    Icon: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    onClick: () => {},
};

const Button = forwardRef(
    ({ children, color, Icon, disabled, isWorking, onClick, className, type, variant }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        const buttonChildren = (
            <>
                {isWorking && <StyledSpinner size={25} />}
                {Icon && <Icon />}
                {children && <ButtonText withPadding={isWorking || Icon}>{children}</ButtonText>}
            </>
        );

        return (
            <>
                {(variant === 'base' && (
                    <BaseButton
                        className={className}
                        onClick={handleClick}
                        variant={variant}
                        type={type}
                        color={color}
                        disabled={disabled || isWorking}
                        isWorking={isWorking}
                        iconOnly={!children}
                        ref={ref}>
                        {buttonChildren}
                    </BaseButton>
                )) ||
                    (variant === 'primary' && (
                        <PrimaryButton
                            className={className}
                            onClick={handleClick}
                            variant={variant}
                            type={type}
                            color={color}
                            disabled={disabled || isWorking}
                            isWorking={isWorking}
                            iconOnly={!children}
                            ref={ref}>
                            {buttonChildren}
                        </PrimaryButton>
                    )) ||
                    (variant === 'bordered' && (
                        <BorderedButton
                            className={className}
                            onClick={handleClick}
                            variant={variant}
                            type={type}
                            color={color}
                            disabled={disabled || isWorking}
                            isWorking={isWorking}
                            iconOnly={!children}
                            ref={ref}>
                            {buttonChildren}
                        </BorderedButton>
                    ))}
            </>
        );
    },
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
