import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from './OutboundLinkStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    target: PropTypes.string,
    rel: PropTypes.string,
};

const defaultProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
};

const OutboundLink = ({ children, ...props }) => <StyledLink {...props}>{children}</StyledLink>;

OutboundLink.propTypes = propTypes;
OutboundLink.defaultProps = defaultProps;

export default OutboundLink;
