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
    height: PropTypes.string,
    width: PropTypes.string,
};

const defaultProps = {
    description: 'Drop files here or click to select files',
    icon: undefined,
    height: '22rem',
    width: '100%',
};

const FileUpload = ({ files, setFiles, description, icon, ...props }) => {
    const onDrop = useCallback(
        acceptedFiles => {
            console.log(acceptedFiles);
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }),
                ),
            );
        },
        [setFiles],
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
            <p>{description}</p>
        </UploadContainer>
    );
};

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;
