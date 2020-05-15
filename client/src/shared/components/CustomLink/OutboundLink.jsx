import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    target: '_blank',
    rel: 'noopener noreferrer',
};

const OutboundLink = ({ className, children, href, target, rel }) => {
    const link = href && href.startsWith('http') ? href : `//${href}`;
    return (
        <a className={className} href={link} target={target} rel={rel}>
            {children}
        </a>
    );
};

OutboundLink.propTypes = propTypes;
OutboundLink.defaultProps = defaultProps;

export default OutboundLink;
