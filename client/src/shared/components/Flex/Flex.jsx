import React from 'react';
import PropTypes from 'prop-types';
import { FlexContainer } from './FlexStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    flexDirection: PropTypes.string,
    flexWrap: PropTypes.string,
    padding: PropTypes.string,
    margin: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0',
    margin: '0',
};

const Flex = ({ children, ...otherProps }) => (
    <FlexContainer {...otherProps}>{children}</FlexContainer>
);

Flex.propTypes = propTypes;
Flex.defaultProps = defaultProps;

export default Flex;
