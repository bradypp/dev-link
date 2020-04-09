import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText, ButtonSpinner } from 'shared/components/StyledButton/StyledButtonStyles';
import { BaseLink } from './StyledLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    Icon: PropTypes.oneOf([PropTypes.element, PropTypes.func]),
    isWorking: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    to: undefined,
    className: undefined,
    children: undefined,
    color: 'primary',
    Icon: undefined,
    isWorking: false,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    ({ children, color, Icon, isWorking, disabled, to, className, onClick }, ref) => {
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
                {isWorking && <ButtonSpinner />}
                {Icon && <Icon className="icon" />}
                {children && <ButtonText withPadding={Icon || isWorking}>{children}</ButtonText>}
            </BaseLink>
        );
    },
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
