import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'shared/components';
import { ButtonText, ButtonSpinner } from './StyledButtonStyles';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    color: PropTypes.string,
    Icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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

const StyledButton = forwardRef(
    ({ children, color, Icon, disabled, isWorking, onClick, className, type }, ref) => {
        const handleClick = () => {
            if (!disabled && !isWorking) {
                onClick();
            }
        };

        return (
            <Button
                className={className}
                onClick={handleClick}
                type={type}
                color={color}
                disabled={disabled || isWorking}
                isWorking={isWorking}
                iconOnly={!children}
                ref={ref}>
                {isWorking && <ButtonSpinner />}
                {Icon && <Icon className="icon" />}
                {children && <ButtonText withPadding={Icon || isWorking}>{children}</ButtonText>}
            </Button>
        );
    },
);

StyledButton.propTypes = propTypes;
StyledButton.defaultProps = defaultProps;

export default StyledButton;
