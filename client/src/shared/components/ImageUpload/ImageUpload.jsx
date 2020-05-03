import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEdit, AiOutlineFileImage } from 'react-icons/ai';
import { ImageUploadContainer } from './ImageUploadStyles';

const propTypes = {
    files: PropTypes.array.isRequired,
    setFiles: PropTypes.func.isRequired,
    className: PropTypes.string,
    description: PropTypes.string,
    maxFiles: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'edit']),
    cleanupPreviews: PropTypes.bool,
};

const defaultProps = {
    className: undefined,
    description: 'Drop an image here, or click here to select an image',
    variant: 'default',
    maxFiles: undefined,
    cleanupPreviews: true,
};

const ImageUpload = ({
    files,
    setFiles,
    description: propsDescription,
    variant,
    ...otherProps
}) => {
    const description = variant === 'default' ? propsDescription : '';
    const icon = variant === 'default' ? <AiOutlineFileImage /> : <AiOutlineEdit />;
    return (
        <ImageUploadContainer
            icon={icon}
            files={files}
            setFiles={setFiles}
            description={description}
            variant={variant}
            {...otherProps}
        />
    );
};

ImageUpload.propTypes = propTypes;
ImageUpload.defaultProps = defaultProps;

export default ImageUpload;
