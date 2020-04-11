import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText, ButtonSpinner } from 'shared/components/Button/ButtonStyles';
import { StyledLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    Icon: PropTypes.oneOf([PropTypes.element, PropTypes.func]),
    lightenDarkenPercentage: PropTypes.number,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    to: undefined,
    className: undefined,
    children: undefined,
    color: 'primary',
    variant: 'primary',
    Icon: undefined,
    lightenDarkenPercentage: 0.08,
    isWorking: false,
    isActive: false,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    (
        {
            children,
            color,
            variant,
            Icon,
            lightenDarkenPercentage,
            isWorking,
            disabled,
            to,
            className,
            onClick,
            isActive,
        },
        ref,
    ) => {
        const handleClick = () => {
            if (!disabled && onClick) {
                onClick();
            }
        };
        return (
            <StyledLink
                to={to}
                className={className}
                color={color}
                variant={variant}
                lightenDarkenPercentage={lightenDarkenPercentage}
                onClick={handleClick}
                disabled={disabled || isWorking}
                isActive={isActive}
                ref={ref}>
                {isWorking && <ButtonSpinner />}
                {Icon && <Icon className="icon" />}
                {children && <ButtonText withPadding={Icon || isWorking}>{children}</ButtonText>}
            </StyledLink>
        );
    },
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
