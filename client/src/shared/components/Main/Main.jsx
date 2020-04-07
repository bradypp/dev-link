import React from 'react';
import PropTypes from 'prop-types';

import { MainContainer, LayoutContainer } from './MainStyles';

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
    <MainContainer>
        <LayoutContainer display={display} flexDirection={flexDirection}>
            {children}
        </LayoutContainer>
    </MainContainer>
);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
