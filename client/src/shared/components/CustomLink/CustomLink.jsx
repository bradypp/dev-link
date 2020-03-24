import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText } from 'shared/styles';
import { BaseLink, PrimaryLink, BorderedLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['base', 'primary', 'bordered']),
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'grey']),
    Icon: PropTypes.element,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    to: undefined,
    className: undefined,
    variant: 'primary',
    children: undefined,
    color: 'primary',
    Icon: undefined,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(
    ({ children, color, Icon, disabled, to, className, onClick, variant }, ref) => {
        const linkChildren = (
            <>
                {Icon && <Icon />}
                {children && <ButtonText withPadding={Icon}>{children}</ButtonText>}
            </>
        );

        return (
            <>
                {(variant === 'base' && (
                    <BaseLink
                        to={to}
                        className={className}
                        variant={variant}
                        color={color}
                        onClick={onClick}
                        disabled={disabled}
                        ref={ref}>
                        {linkChildren}
                    </BaseLink>
                )) ||
                    (variant === 'primary' && (
                        <PrimaryLink
                            to={to}
                            className={className}
                            variant={variant}
                            color={color}
                            onClick={onClick}
                            disabled={disabled}
                            ref={ref}>
                            {linkChildren}
                        </PrimaryLink>
                    )) ||
                    (variant === 'bordered' && (
                        <BorderedLink
                            to={to}
                            className={className}
                            variant={variant}
                            color={color}
                            onClick={onClick}
                            disabled={disabled}
                            ref={ref}>
                            {linkChildren}
                        </BorderedLink>
                    ))}
            </>
        );
    },
);

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
