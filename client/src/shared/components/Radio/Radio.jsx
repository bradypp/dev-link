import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    clicked: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    value: '',
    clicked: false,
    type: 'radio',
    onChange: () => {},
};

const Radio = forwardRef(({ onChange, clicked, ...props }, ref) => (
    <input
        checked={clicked}
        onChange={event => onChange(props.value, event)}
        ref={ref}
        {...props}
    />
));

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
