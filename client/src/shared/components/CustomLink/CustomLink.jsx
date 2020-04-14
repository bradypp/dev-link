import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonText, ButtonSpinner } from 'shared/components/Button/ButtonStyles';
import { StyledLink } from './CustomLinkStyles';

const propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    variant: PropTypes.string,
    buttonBehaviour: PropTypes.string,
    Icon: PropTypes.oneOf([PropTypes.element, PropTypes.func]),
    lightenDarkenPercentage: PropTypes.number,
    isWorking: PropTypes.bool,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    children: undefined,
    backgroundColor: 'buttonPrimary',
    textColor: undefined,
    variant: 'primary',
    buttonBehaviour: 'default',
    Icon: undefined,
    lightenDarkenPercentage: 0.05,
    isWorking: false,
    isActive: false,
    disabled: false,
    onClick: undefined,
};

const CustomLink = forwardRef(({ children, Icon, isWorking, disabled, ...otherProps }, ref) => (
    <StyledLink disabled={disabled || isWorking} ref={ref} {...otherProps}>
        {isWorking && <ButtonSpinner />}
        {Icon && <Icon className="icon" />}
        {children && <ButtonText withPadding={Icon || isWorking}>{children}</ButtonText>}
    </StyledLink>
));

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

export default CustomLink;
