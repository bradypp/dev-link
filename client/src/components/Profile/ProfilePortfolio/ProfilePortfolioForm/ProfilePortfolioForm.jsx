import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-image';
import { updatePortfolioItem, deletePortfolioItem, addPortfolioItem } from 'redux/profile';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';
import * as S from './ProfilePortfolioFormStyles';

const propTypes = {
    updatePortfolioItem: PropTypes.func.isRequired,
    deletePortfolioItem: PropTypes.func.isRequired,
    addPortfolioItem: PropTypes.func.isRequired,
    formData: PropTypes.object,
};

const defaultProps = {
    formData: undefined,
};

const mapDispatchToProps = {
    updatePortfolioItem,
    deletePortfolioItem,
    addPortfolioItem,
};

const ProfilePortfolioForm = ({
    updatePortfolioItem,
    deletePortfolioItem,
    addPortfolioItem,
    formData,
    ...otherProps
}) => {
    const data = formData || {
        _id: undefined,
        title: '',
        description: '',
        repo: '',
        images: [],
        skills: [],
        demo: '',
    };
    const { _id, title, description, repo, images, skills, demo } = data;

    const [imagesFromApi, setImagesFromApi] = useState(images);
    const [imageFiles, setImageFiles] = useState([]);
    const [cleanupPreviews, setCleanupPreviews] = useState(false);

    const portfolioValidation = Yup.object().shape({
        title: validators.required('Title is required'),
        description: validators.required('Description is required'),
    });
    return (
        <EditModal
            {...otherProps}
            id={_id}
            onOpen={() => setCleanupPreviews(false)}
            onClose={() => {
                setImageFiles([]);
                setCleanupPreviews(true);
            }}
            onDelete={() => deletePortfolioItem(_id)}
            renderContent={({ close }) => (
                <>
                    <h2>Edit Portfolio</h2>
                    <Form
                        initialValues={{
                            title,
                            description,
                            repo,
                            skills,
                            demo,
                        }}
                        validationSchema={portfolioValidation}
                        onSubmit={values => {
                            setCleanupPreviews(true);
                            if (formData) {
                                updatePortfolioItem({
                                    ...values,
                                    _id,
                                    imageFiles,
                                    images: imagesFromApi,
                                });
                            } else {
                                addPortfolioItem({
                                    ...values,
                                    imageFiles,
                                    images: imagesFromApi,
                                });
                            }
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.Input label="Title *" name="title" />
                                <Form.Field.TextArea
                                    label="Description *"
                                    tip="Write a short description about the project"
                                    name="description"
                                />
                                <Form.Field.Select
                                    label="Skills"
                                    tip="Add any relevant skills that you used on this project"
                                    isMulti
                                    withOptions={false}
                                    valuePlaceholder="Add skill"
                                    inputPlaceholder="Add a skill"
                                    withCreate
                                    name="skills"
                                    variant="empty"
                                    options={values.skills.map(skill => ({
                                        label: skill,
                                        value: skill,
                                    }))}
                                />
                                <Form.Flex>
                                    <Form.Field.Input
                                        label="Repo"
                                        tip="Add a link to the project repo"
                                        name="repo"
                                    />
                                    <Form.Field.Input
                                        label="Demo"
                                        tip="Add a link to the live demo"
                                        name="demo"
                                    />
                                </Form.Flex>
                                <Form.FieldContainer label="Project images">
                                    <S.ImageUploadContainer>
                                        <S.StyledImageUpload
                                            description="Drop up to 6 images here, or click here to select image files"
                                            files={imageFiles}
                                            setFiles={setImageFiles}
                                            maxFiles={6 - imagesFromApi.length}
                                            cleanupPreviews={cleanupPreviews}
                                        />
                                        <S.ImagesContainer>
                                            {imagesFromApi.map((image, i) => (
                                                <S.ImageContainer key={uuidv4()}>
                                                    <Image src={image} />
                                                    <S.DeleteButton
                                                        onClick={() => {
                                                            const newImages = [...imagesFromApi];
                                                            newImages.splice(i, 1);
                                                            setImagesFromApi(newImages);
                                                        }}
                                                    />
                                                </S.ImageContainer>
                                            ))}
                                            {imageFiles.map((image, i) => (
                                                <S.ImageContainer key={uuidv4()}>
                                                    <Image src={image.preview} />
                                                    <S.DeleteButton
                                                        onClick={() => {
                                                            const newImages = [...imageFiles];
                                                            newImages.splice(i, 1);
                                                            setImageFiles(newImages);
                                                        }}
                                                    />
                                                </S.ImageContainer>
                                            ))}
                                        </S.ImagesContainer>
                                    </S.ImageUploadContainer>
                                </Form.FieldContainer>
                                <Form.Buttons withCancel onCancel={close} />
                            </Form.Element>
                        )}
                    </Form>
                </>
            )}
        />
    );
};

ProfilePortfolioForm.propTypes = propTypes;
ProfilePortfolioForm.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(ProfilePortfolioForm);
