import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { validators } from 'shared/utils';
import { formConstants } from 'shared/constants';
import * as Yup from 'yup';
import { updateProfile } from 'redux/profile';

const propTypes = {
    formData: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    updateProfile,
};

const ProfileAboutForm = ({ updateProfile, formData }) => {
    const { bio, desired_roles, role_types, availability } = formData;

    const aboutValidation = Yup.object().shape({
        bio: validators.required('Bio is required'),
    });

    return (
        <EditModal
            renderContent={({ close }) => (
                <>
                    <h2>Edit About Me</h2>
                    <Form
                        initialValues={{
                            bio,
                            desired_roles,
                            role_types,
                            availability,
                        }}
                        validationSchema={aboutValidation}
                        onSubmit={values => {
                            updateProfile({
                                bio: values.bio,
                                desired_roles: values.desired_roles,
                                role_types: values.role_types,
                                availability: values.availability,
                            });
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.TextArea
                                    label="Bio *"
                                    tip="Write a short paragraph about yourself"
                                    name="bio"
                                />
                                <Form.Flex>
                                    <Form.Field.Select
                                        label="Desired roles"
                                        tip="What roles are you're interested in?"
                                        isMulti
                                        withOptions={false}
                                        valuePlaceholder="Add role"
                                        inputPlaceholder="Add a desired role"
                                        withCreate
                                        name="desired_roles"
                                        variant="empty"
                                        options={values.desired_roles.map(role => ({
                                            label: role,
                                            value: role,
                                        }))}
                                    />
                                    <Form.Field.Select
                                        label="Desired role types"
                                        tip="Choose what type of roles/contracts you're interested in"
                                        isMulti
                                        valuePlaceholder="Add type"
                                        inputPlaceholder="Search"
                                        name="role_types"
                                        variant="empty"
                                        options={formConstants.roleTypes.map(type => ({
                                            label: type,
                                            value: type,
                                        }))}
                                    />
                                </Form.Flex>
                                <Form.Field.Select
                                    label="Availability"
                                    tip="When are you available to start work?"
                                    removeSelected={false}
                                    valuePlaceholder="Select"
                                    inputPlaceholder="Search"
                                    name="availability"
                                    width="50%"
                                    options={formConstants.availability.map(type => ({
                                        label: type,
                                        value: type,
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

ProfileAboutForm.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(ProfileAboutForm);
