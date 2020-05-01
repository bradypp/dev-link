import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { updateProfile } from 'redux/profile';

const propTypes = {
    formData: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    updateProfile,
};

// TODO: split name into first name and last name?
const ProfileTopForm = ({ updateProfile, currentUser, formData }) => {
    const { name, headline, city, country, company, current_position, skills } = formData;
    return (
        <EditModal
            renderContent={({ close }) => (
                <>
                    <h2>Edit Intro</h2>
                    <Form
                        initialValues={{
                            name: name || currentUser.name,
                            headline,
                            city,
                            country,
                            company,
                            current_position,
                            skills,
                        }}
                        onSubmit={values => {
                            updateProfile(values);
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.Input label="Name" name="name" />
                                <Form.Field.TextArea label="Headline" name="headline" />
                                <Form.Flex>
                                    <Form.Field.Input label="Country" name="country" />
                                    <Form.Field.Input label="City" name="city" />
                                </Form.Flex>
                                <Form.Flex>
                                    <Form.Field.Input label="Company" name="company" />
                                    <Form.Field.Input
                                        label="Current Position"
                                        name="current_position"
                                    />
                                </Form.Flex>
                                <Form.Field.Select
                                    isMulti
                                    withOptions={false}
                                    valuePlaceholder="Add skill"
                                    inputPlaceholder="Add a skill"
                                    withCreate
                                    label="Skills"
                                    tip="Choose your featured development skills"
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
