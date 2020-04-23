import React from 'react';
import PropTypes from 'prop-types';
import { useCopyText } from 'shared/hooks';
import { Button } from 'shared/components';

const propTypes = {
    textToCopy: PropTypes.string.isRequired,
};

// TODO: button styling (use icon instead of text?)
const CopyButton = ({ textToCopy, ...otherProps }) => {
    const [isCopied, handleCopy] = useCopyText(textToCopy);

    return (
        <Button onClick={handleCopy} {...otherProps}>
            {isCopied ? 'Copied' : 'Copy'}
        </Button>
    );
};

CopyButton.propTypes = propTypes;

export default CopyButton;
