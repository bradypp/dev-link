import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GrUpload } from 'react-icons/gr';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'shared/components';
import { UploadContainer } from './FileUploadStyles';

const propTypes = {
    files: PropTypes.array.isRequired,
    setFiles: PropTypes.func.isRequired,
    description: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    maxFiles: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'edit']),
};

const defaultProps = {
    description: 'Drop files here or click to select files',
    icon: undefined,
    maxFiles: undefined,
    variant: 'default',
};

const FileUpload = ({ files, setFiles, description, icon, maxFiles, ...props }) => {
    const onDrop = useCallback(
        acceptedFiles => {
            const filesWithPreview = acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            );
            files.push(filesWithPreview);
            const newFiles = maxFiles ? files.flat().splice(0, maxFiles) : files.flat();
            return setFiles(newFiles);
        },
        [files, maxFiles, setFiles],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    });

    const renderedIcon = icon ? (
        typeof icon === 'string' ? (
            <Icon type={icon} />
        ) : (
            icon
        )
    ) : (
        <GrUpload />
    );

    return (
        <UploadContainer {...props} isDragActive={isDragActive} {...getRootProps()}>
            <input {...getInputProps()} />
            {renderedIcon}
            {description && <p>{description}</p>}
        </UploadContainer>
    );
};

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;
