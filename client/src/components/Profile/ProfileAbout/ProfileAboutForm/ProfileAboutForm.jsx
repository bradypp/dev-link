import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import * as Yup from 'yup';
import { validators } from 'shared/utils';
import { updateProfile } from 'redux/profile';

const propTypes = {
    formData: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    updateProfile,
};

// TODO: split name into first name and last name?
const ProfileTopForm = ({ updateProfile, formData }) => {
    const { bio, roles, roleTypes, availability } = formData;

    const aboutValidation = Yup.object().shape({});

    return (
        <EditModal
            renderContent={({ close }) => (
                <>
                    <h2>Edit About Me</h2>
                    <Form
                        initialValues={{
                            bio,
                            roles,
                            types: roleTypes,
                            availability,
                        }}
                        validationSchema={aboutValidation}
                        onSubmit={values => {
                            updateProfile(values);
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.TextEditor
                                    label="Headline *"
                                    name="headline"
                                    tip="Write a catchy headline for your profile"
                                />
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

export default connect(null, mapDispatchToProps)(ProfileTopForm);
