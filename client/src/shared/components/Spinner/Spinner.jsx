import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner, SpinnerContainer } from './SpinnerStyles';

const propTypes = {
    size: PropTypes.string,
    variant: PropTypes.oneOf(['button', 'default']),
    color: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    size: '4.5rem',
    variant: 'default',
    color: 'dark',
    className: undefined,
};

const Spinner = ({ className, ...props }) => (
    <SpinnerContainer className={className}>
        <StyledSpinner {...props} />
    </SpinnerContainer>
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
