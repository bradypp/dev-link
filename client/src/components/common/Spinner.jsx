import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ overlayActive, size }) => (
    <div className={`${overlayActive && 'spinner-overlay'}`}>
        <div className={`spinner ${size === 'small' && 'spinner--medium'}`} />
    </div>
);

Spinner.defaultProps = {
    overlayActive: true,
    size: 'default',
};

Spinner.propTypes = {
    overlayActive: PropTypes.bool,
    size: PropTypes.string,
};

export default Spinner;
