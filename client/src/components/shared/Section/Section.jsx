import React from 'react';
import PropTypes from 'prop-types';

import StyledSection from './SectionStyles';

const Section = ({ children }) => <StyledSection>{children}</StyledSection>;

Section.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Section;
