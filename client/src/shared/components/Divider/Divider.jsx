import React from 'react';
import PropTypes from 'prop-types';
import { StyledDivider } from './DividerStyles';

const propTypes = {
    margin: PropTypes.string,
    borderAlign: PropTypes.oneOf(['horizontal', 'vertical']),
    borderColor: PropTypes.string,
};

const defaultProps = {
    margin: undefined,
    borderAlign: 'horizontal',
    borderColor: 'border1',
};

const Divider = props => {
    return <StyledDivider {...props} />;
};

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default Divider;
