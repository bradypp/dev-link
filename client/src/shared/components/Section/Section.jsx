import React from 'react';
import PropTypes from 'prop-types';

import StyledSection from './SectionStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    isContained: PropTypes.bool,
    layout: PropTypes.oneOf(['grid', 'flex']),
    maxWidth: PropTypes.number,
    gridGap: PropTypes.number,
    numberOfColumns: PropTypes.number,
};

const defaultProps = {
    layout: 'grid',
    isContained: true,
    maxWidth: undefined,
    gridGap: undefined,
    numberOfColumns: 16,
};

const Section = ({ children, layout, isContained, maxWidth, gridGap, numberOfColumns }) => (
    <StyledSection
        layout={layout}
        isContained={isContained}
        maxWidth={maxWidth}
        gridGap={gridGap}
        numberOfColumns={numberOfColumns}>
        {children}
    </StyledSection>
);

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
