import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { StyledInput, InputElement } from './InputStyles';

const propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
    height: PropTypes.number,
    borderRadius: PropTypes.string,
};

const defaultProps = {
    className: undefined,
    value: undefined,
    Icon: undefined,
    invalid: false,
    onChange: () => {},
    height: 3.2,
    borderRadius: `0.3rem`,
};

const Input = forwardRef(({ Icon, className, onChange, height, ...inputProps }, ref) => (
    <StyledInput className={className} height={height}>
        {Icon && <Icon className="icon" />}
        <InputElement
            {...inputProps}
            onChange={onChange}
            hasIcon={!!Icon}
            height={height}
            ref={ref}
        />
    </StyledInput>
));

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
