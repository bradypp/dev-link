import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from './OutboundLinkStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
    rel: PropTypes.string,
};

const defaultProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
};

const OutboundLink = ({ children, href, ...props }) => {
    const link = href.startsWith('http') ? href : `//${href}`;
    return (
        <StyledLink href={link} {...props}>
            {children}
        </StyledLink>
    );
};

OutboundLink.propTypes = propTypes;
OutboundLink.defaultProps = defaultProps;

export default OutboundLink;
