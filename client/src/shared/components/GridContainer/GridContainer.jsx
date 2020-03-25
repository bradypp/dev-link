import React from 'react';
import PropTypes from 'prop-types';

import StyledGridContainer from './GridContainerStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const GridContainer = ({ children }) => <StyledGridContainer>{children}</StyledGridContainer>;

GridContainer.propTypes = propTypes;

export default GridContainer;
