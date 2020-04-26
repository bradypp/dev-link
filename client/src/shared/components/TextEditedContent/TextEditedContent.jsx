/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';
import { Content } from './TextEditedContentStyles';

const propTypes = {
    content: PropTypes.string.isRequired,
};

// Allows for direct editing of element innerHTML
const TextEditedContent = ({ content, ...props }) => (
    <div className="ql-snow">
        <Content className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} {...props} />
    </div>
);

TextEditedContent.propTypes = propTypes;

export default TextEditedContent;
