import React from 'react';
import PropTypes from 'prop-types';

import StyledSection from './SectionStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    layout: PropTypes.oneOf(['grid', 'flex']),
};

const defaultProps = {
    layout: 'grid',
};

const Section = ({ children, layout }) => <StyledSection layout={layout}>{children}</StyledSection>;

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
