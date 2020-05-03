import React from 'react';
import PropTypes from 'prop-types';

import { MainContainer, LayoutContainer } from './MainStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    display: PropTypes.oneOf(['grid', 'flex']),
    columnNumber: PropTypes.number,
    backgroundColor: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    display: 'grid',
    columnNumber: 16,
    backgroundColor: 'background2',
};

const Main = ({ children, backgroundColor, ...props }) => (
    <MainContainer backgroundColor={backgroundColor}>
        <LayoutContainer {...props}>{children}</LayoutContainer>
    </MainContainer>
);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
