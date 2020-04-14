import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from './SimpleLinkStyles';

const propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    target: '_blank',
    rel: 'noopener noreferrer',
};

const defaultProps = {
    className: undefined,
    children: undefined,
    target: '_blank',
    rel: 'noopener noreferrer',
};

const SimpleLink = ({ children, ...otherProps }) => (
    <StyledLink {...otherProps}>{children}</StyledLink>
);

SimpleLink.propTypes = propTypes;
SimpleLink.defaultProps = defaultProps;

export default SimpleLink;
