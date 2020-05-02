import React from 'react';
import PropTypes from 'prop-types';
import { styleIcon } from './IconStyles';

const propTypes = {
    type: PropTypes.string.isRequired,
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

// TODO: covert icons over to this
// Icon library
const types = {};

const Icon = ({ type, ...props }) => {
    const StyledIcon = styleIcon(types[type]);
    return <StyledIcon data-testid={`icon:${type}`} {...props} />;
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
