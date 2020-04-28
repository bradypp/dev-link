import React from 'react';
import PropTypes from 'prop-types';
import { GrImage } from 'react-icons/gr';
import { FileUpload } from 'shared/components';

const propTypes = {
    images: PropTypes.array.isRequired,
    setImages: PropTypes.func.isRequired,
    description: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

const defaultProps = {
    description: 'Drop an image here or click here to select an image',
    height: '22rem',
    width: '22rem',
};

const ImageUpload = ({ images, setImages, ...otherProps }) => (
    <FileUpload icon={<GrImage />} files={images} setFiles={setImages} {...otherProps} />
);

ImageUpload.propTypes = propTypes;
ImageUpload.defaultProps = defaultProps;

export default ImageUpload;
