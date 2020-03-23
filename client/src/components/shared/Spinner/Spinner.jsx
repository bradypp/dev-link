import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner, SpinnerOverlay } from './SpinnerStyles';

const propTypes = {
    overlayActive: PropTypes.bool,
    size: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    overlayActive: true,
    size: 45,
    className: undefined,
};

const Spinner = ({ overlayActive, size, className }) => (
    <SpinnerOverlay className={className} overlayActive={overlayActive}>
        <StyledSpinner size={size} />
    </SpinnerOverlay>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
