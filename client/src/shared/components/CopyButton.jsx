import React from 'react';
import PropTypes from 'prop-types';
import { useCopyText } from 'shared/hooks';
import { Button } from 'shared/components';

const propTypes = {
    textToCopy: PropTypes.string.isRequired,
};

const CopyButton = ({ textToCopy, ...props }) => {
    const [isCopied, handleCopy] = useCopyText(textToCopy);

    return (
        <Button onClick={handleCopy} {...props}>
            {isCopied ? 'Copied' : 'Copy'}
        </Button>
    );
};

CopyButton.propTypes = propTypes;

export default CopyButton;
