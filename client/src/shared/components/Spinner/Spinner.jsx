import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner, SpinnerOverlay } from './SpinnerStyles';

const propTypes = {
    overlayActive: PropTypes.bool,
    size: PropTypes.string,
    variant: PropTypes.oneOf(['button', 'default']),
    className: PropTypes.string,
};

const defaultProps = {
    overlayActive: true,
    size: '4.5rem',
    variant: 'default',
    className: undefined,
};

const Spinner = ({ overlayActive, size, variant, className }) => (
    <SpinnerOverlay className={className} overlayActive={overlayActive}>
        <StyledSpinner size={size} variant={variant} />
    </SpinnerOverlay>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
