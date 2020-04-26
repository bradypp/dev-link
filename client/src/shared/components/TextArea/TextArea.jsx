import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TextAreaAutoSize from 'react-textarea-autosize';
import { TextAreaContainer } from './TextAreaStyles';

const propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    minRows: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    className: undefined,
    invalid: false,
    minRows: 2,
    value: undefined,
    onChange: () => {},
};

// TODO: customize & test
const TextArea = forwardRef(({ className, invalid, onChange, ...props }, ref) => (
    <TextAreaContainer className={className} invalid={invalid}>
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
