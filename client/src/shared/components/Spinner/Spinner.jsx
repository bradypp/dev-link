import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner, SpinnerOverlay } from './SpinnerStyles';

const propTypes = {
    renderOverlay: PropTypes.bool,
    size: PropTypes.string,
    variant: PropTypes.oneOf(['button', 'default']),
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    renderOverlay: true,
    size: '4.5rem',
    variant: 'default',
    color: 'dark',
    className: undefined,
};

const Spinner = ({ renderOverlay, className, ...otherProps }) => (
    <SpinnerOverlay className={className} renderOverlay={renderOverlay}>
        <StyledSpinner {...otherProps} />
    </SpinnerOverlay>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
