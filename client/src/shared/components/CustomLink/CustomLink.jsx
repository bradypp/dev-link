import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText, ButtonSpinner } from 'shared/components/Button/ButtonStyles';
import { StyledLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    textColor: PropTypes.string,
    icon: PropTypes.node,
    styledAsButton: PropTypes.bool,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    backgroundColor: undefined,
    borderColor: undefined,
    textColor: undefined,
    icon: undefined,
    styledAsButton: false,
    isWorking: false,
    isActive: false,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(({ children, icon, isWorking, disabled, ...otherProps }, ref) => (
    <StyledLink disabled={disabled || isWorking} ref={ref} {...otherProps}>
        {isWorking && <ButtonSpinner />}
        {icon && icon}
        {children && <ButtonText withPadding={icon || isWorking}>{children}</ButtonText>}
    </StyledLink>
));

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
