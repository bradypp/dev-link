import React from 'react';
import PropTypes from 'prop-types';

import { MainContainer, LayoutContainer } from './MainStyles';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    display: PropTypes.oneOf(['grid', 'flex']),
    gridColumns: PropTypes.number,
    gridGap: PropTypes.string,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    flexDirection: PropTypes.string,
    backgroundColor: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    display: 'grid',
    gridColumns: 16,
    gridGap: '1.6rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'background2',
};

const Main = ({
    children,
    className,
    display,
    gridColumns,
    gridGap,
    justifyContent,
    flexDirection,
    alignItems,
    backgroundColor,
}) => (
    <MainContainer backgroundColor={backgroundColor}>
        <LayoutContainer
            className={className}
            display={display}
            gridColumns={gridColumns}
            gridGap={gridGap}
            justifyContent={justifyContent}
            alignItems={alignItems}
            flexDirection={flexDirection}>
            {children}
        </LayoutContainer>
    </MainContainer>
);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
