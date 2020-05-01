import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from 'react-image';
import { updateImage } from 'redux/profile';
import * as S from './CoverImageFormStyles';

const propTypes = {
    updateImage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    updateImage,
};

// TODO: try to combine with avatar upload into a reusable upload component
const CoverImageForm = ({ updateImage }) => {
    const [image, setImage] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (image.length > 0) setIsOpen(true);
    }, [image]);

    const onClose = () => {
        setIsOpen(false);
        setImage([]);
    };

    return image.length > 0 ? (
        <S.CoverImageModal
            withCloseButton={false}
            isOpen={isOpen}
            onClose={onClose}
            renderContent={() => (
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        updateImage(image[0], 'cover_image');
                        setIsOpen(false);
                        setImage([]);
                    }}>
                    <Image src={image[0].preview} />
                    <S.ButtonsContainer withCancel onCancel={onClose} />
                </form>
            )}
        />
    ) : (
        <S.CoverImageUpload files={image} setFiles={setImage} variant="edit" maxFiles={1} />
    );
};

CoverImageForm.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(CoverImageForm);
