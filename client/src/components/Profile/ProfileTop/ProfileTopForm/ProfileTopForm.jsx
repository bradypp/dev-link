import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'shared/components';
import { createStructuredSelector } from 'reselect';
import { EditModal } from 'components';
import * as Yup from 'yup';
import { validators } from 'shared/utils';
import { selectUser } from 'redux/auth';
import { updateProfile, createProfile } from 'redux/profile';

const propTypes = {
    updateProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    isEdit: PropTypes.bool,
    formData: PropTypes.object,
};

const defaultProps = {
    isEdit: true,
    formData: undefined,
};
const mapStateToProps = createStructuredSelector({
    currentUser: selectUser,
});

const mapDispatchToProps = {
    updateProfile,
    createProfile,
};

const ProfileTopForm = ({
    updateProfile,
    createProfile,
    currentUser,
    isEdit,
    formData,
    ...props
}) => {
    const introValidation = Yup.object().shape({
        name: validators.required('Name is required'),
        headline: validators.required('Headline is required'),
    });

    return (
        <EditModal
            {...props}
            renderContent={({ close }) => (
                <>
                    <h2>{isEdit ? 'Edit Intro' : 'Create Profile'}</h2>
                    <Form
                        initialValues={{
                            name: formData ? formData.name : currentUser.name || '',
                            headline: formData ? formData.headline : '',
                            city: formData ? formData.city : '',
                            country: formData ? formData.country : '',
                            company: formData ? formData.company : '',
                            current_position: formData ? formData.current_position : '',
                            skills: formData ? formData.skills : [],
                        }}
                        validationSchema={introValidation}
                        onSubmit={values => {
                            if (isEdit) {
                                updateProfile(values);
                                close();
                            } else {
                                createProfile(values);
                            }
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.Input
                                    autoFocus
                                    label="Name *"
                                    name="name"
                                    tip="Please enter your public name"
                                />
                                <Form.Field.TextArea
                                    label="Headline *"
                                    name="headline"
                                    tip="Write a catchy headline for your profile"
                                />
                                <Form.Flex>
                                    <Form.Field.Input
                                        label="Country"
                                        name="country"
                                        tip="What country do you live in?"
                                    />
                                    <Form.Field.Input
                                        label="City"
                                        name="city"
                                        tip="What city do you live in?"
                                    />
                                </Form.Flex>
                                <Form.Flex>
                                    <Form.Field.Input
                                        label="Company"
                                        name="company"
                                        tip="Where do you currently work?"
                                    />
                                    <Form.Field.Input
                                        label="Current Position"
                                        name="current_position"
                                        tip="What is your current role?"
                                    />
                                </Form.Flex>
                                <Form.Field.Select
                                    label="Skills"
                                    tip="Choose skills and languages to feature on your profile"
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
                                <Form.Buttons withCancel onCancel={close} />
                            </Form.Element>
                        )}
                    </Form>
                </>
            )}
        />
    );
};

ProfileTopForm.propTypes = propTypes;
ProfileTopForm.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTopForm);
