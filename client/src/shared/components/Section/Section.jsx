import React from 'react';
import PropTypes from 'prop-types';
import { SectionContainer } from './SectionStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    display: PropTypes.oneOf(['grid', 'flex']),
    gridColumns: PropTypes.number,
    gridGap: PropTypes.string,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    flexDirection: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    display: 'flex',
    gridColumns: 8,
    gridGap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
};

const Section = ({ children, ...otherProps }) => (
    <SectionContainer {...otherProps}>{children}</SectionContainer>
);

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;
