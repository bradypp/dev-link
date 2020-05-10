import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner, SpinnerOverlay } from './SpinnerStyles';

const propTypes = {
    size: PropTypes.string,
    variant: PropTypes.oneOf(['button', 'default']),
    color: PropTypes.string,
    className: PropTypes.string,
    containerHeight: PropTypes.string,
};

const defaultProps = {
    size: '4.5rem',
    variant: 'default',
    color: 'dark',
    className: undefined,
    containerHeight: undefined,
};

const Spinner = ({ className, ...props }) => (
    <SpinnerOverlay className={className}>
        <StyledSpinner {...props} />
    </SpinnerOverlay>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
