import React from 'react';
import PropTypes from 'prop-types';
import { styleIcon } from './IconStyles';

const propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    left: PropTypes.number,
    top: PropTypes.number,
};

const defaultProps = {
    className: undefined,
    size: '1.6rem',
    color: undefined,
    left: 0,
    top: 0,
};

// Icon library
const icons = {};

const Icon = ({ name, ...props }) => {
    const StyledIcon = styleIcon(icons[name]);
    return <StyledIcon data-testid={`icon:${name}`} {...props} />;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
