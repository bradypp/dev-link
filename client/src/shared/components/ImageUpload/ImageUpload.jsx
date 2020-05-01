import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
import { GrImage } from 'react-icons/gr';
import { ImageUploadContainer } from './ImageUploadStyles';

const propTypes = {
    files: PropTypes.array.isRequired,
    setFiles: PropTypes.func.isRequired,
    description: PropTypes.string,
    maxFiles: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'edit']),
};

const defaultProps = {
    description: 'Drop an image here or click here to select an image',
    variant: 'default',
    maxFiles: undefined,
};

const ImageUpload = ({
    files,
    setFiles,
    description: propsDescription,
    variant,
    ...otherProps
}) => {
    const description = variant === 'default' ? propsDescription : '';
    const icon = variant === 'default' ? <GrImage /> : <FaEdit />;
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
