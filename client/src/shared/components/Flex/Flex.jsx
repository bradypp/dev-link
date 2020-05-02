import React from 'react';
import PropTypes from 'prop-types';
import { FlexContainer } from './FlexStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    flexDirection: PropTypes.string,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    flexWrap: PropTypes.string,
    alignContent: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
};

const Flex = ({ children, ...props }) => {
    return <FlexContainer {...props}>{children}</FlexContainer>;
};

Flex.propTypes = propTypes;
Flex.defaultProps = defaultProps;

export default Flex;
