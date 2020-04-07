import React from 'react';
import PropTypes from 'prop-types';

import MainContainer from './MainStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    display: PropTypes.oneOf(['grid', 'flex']),
    flexDirection: PropTypes.string,
};

const defaultProps = {
    display: 'grid',
    flexDirection: 'column',
};

const Main = ({ children, display, flexDirection }) => (
    <MainContainer display={display} flexDirection={flexDirection}>
        {children}
    </MainContainer>
);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
