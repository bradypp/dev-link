import React from 'react';
import PropTypes from 'prop-types';

import { MainContainer, LayoutContainer } from './MainStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    display: PropTypes.oneOf(['grid', 'flex']),
    flexDirection: PropTypes.string,
    backgroundColor: PropTypes.string,
};

const defaultProps = {
    display: 'grid',
    flexDirection: 'column',
    backgroundColor: 'background2',
};

const Main = ({ children, display, flexDirection, backgroundColor }) => (
    <MainContainer backgroundColor={backgroundColor}>
        <LayoutContainer display={display} flexDirection={flexDirection}>
            {children}
        </LayoutContainer>
    </MainContainer>
);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
