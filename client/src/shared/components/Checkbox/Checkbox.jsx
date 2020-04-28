import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
    clicked: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    value: false,
    clicked: false,
    type: 'checkbox',
    onChange: () => {},
};

const CheckBox = forwardRef(({ clicked, onChange, ...props }, ref) => (
    <input
        checked={clicked}
        onChange={event => onChange(!!event.target.value, event)}
        ref={ref}
        {...props}
    />
));

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;