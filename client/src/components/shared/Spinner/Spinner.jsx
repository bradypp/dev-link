import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner, SpinnerOverlay } from './SpinnerStyles';

const propTypes = {
    overlayActive: PropTypes.bool,
    size: PropTypes.string,
};

const defaultProps = {
    overlayActive: true,
    size: 'default',
};

const Spinner = ({ overlayActive, size }) => (
    <SpinnerOverlay overlayActive={overlayActive}>
        <StyledSpinner size={size} />
    </SpinnerOverlay>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
