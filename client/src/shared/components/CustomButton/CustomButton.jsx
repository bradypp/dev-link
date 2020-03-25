import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText } from 'shared/styles';
import { BaseButton, StyledSpinner } from './CustomButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'submit']),
    color: PropTypes.string,
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    color: 'primary',
    Icon: undefined,
    type: 'button',
    disabled: false,
    isWorking: false,
    onClick: () => {},
};

const CustomButton = forwardRef(
    ({ children, color, Icon, disabled, isWorking, onClick, className, type }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        return (
            <BaseButton
                className={className}
                onClick={handleClick}
                type={type}
                color={color}
                disabled={disabled || isWorking}
                isWorking={isWorking}
                iconOnly={!children}
                ref={ref}>
                {isWorking && <StyledSpinner size={25} />}
                {Icon && <Icon />}
                {children && <ButtonText withPadding={isWorking || Icon}>{children}</ButtonText>}
            </BaseButton>
        );
    },
);

CustomButton.propTypes = propTypes;
CustomButton.defaultProps = defaultProps;

export default CustomButton;
