import React from 'react';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
// import Image from 'react-image';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { updateProfile } from 'redux/profile';
import * as S from './ProfileTopFormStyles';

const propTypes = {
    formData: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
};

const defaultProps = {
    currentUser: undefined,
};

const mapDispatchToProps = {
    updateProfile,
};

// TODO: split name into first name and last name?
const ProfileTopForm = ({ updateProfile, currentUser, formData }) => (
    <EditModal
        renderContent={({ close }) => (
            <>
                <h2>Edit Intro</h2>
                <Form
                    initialValues={{
                        ...formData,
                        name: formData.name || currentUser.name,
                    }}
                    onSubmit={values => {
                        console.log(values);
                        // updateProfile(values);
                        // close();
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
                            {/* <div>
                                <Form.FieldLabel>Skills</Form.FieldLabel>
                                <Form.FieldArray name="skills" htmlfor="skill-1">
                                    {arrayMethods => (
                                        <S.SkillsContainer>
                                            {values.skills.map((skill, i) => (
                                                <Form.Field.Input
                                                    name={`skills[${i}]`}
                                                    id={'skill-1'}
                                                />
                                            ))}
                                        </S.SkillsContainer>
                                    )}
                                </Form.FieldArray>
                            </div> */}
                            <Form.Field.Select
                                isMulti
                                withOptions={false}
                                valuePlaceholder="Add"
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

ProfileTopForm.propTypes = propTypes;
ProfileTopForm.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(ProfileTopForm);
