import React from 'react';
import PropTypes from 'prop-types';

import StyledGridContainer from './GridContainerStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
};
// TODO: delete if not used
const GridContainer = ({ children }) => <StyledGridContainer>{children}</StyledGridContainer>;

GridContainer.propTypes = propTypes;

export default GridContainer;
