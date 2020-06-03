import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TextAreaAutoSize from 'react-textarea-autosize';
import { TextAreaContainer } from './TextAreaStyles';

const propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    height: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    invalid: false,
    height: 10,
    value: undefined,
    onChange: () => {},
};

const TextArea = forwardRef(({ className, invalid, onChange, height, ...props }, ref) => (
    <TextAreaContainer className={className} invalid={invalid} height={height}>
        <TextAreaAutoSize
            onChange={event => onChange(event.target.value, event)}
            inputRef={ref || undefined}
            {...props}
        />
    </TextAreaContainer>
));

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;
