import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Form } from 'shared/components';
import * as S from './ContactFormStyles';

const propTypes = {
    formData: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired,
};

export const ContactForm = ({ updateProfile, formData, setIsEditing }) => {
    const { socials, contact } = formData;

    return (
        <>
            <h2>Edit Contact Info</h2>
            <Form
                initialValues={{
                    socials,
                    contact,
                }}
                onSubmit={values => {
                    setIsEditing(false);
                    updateProfile(values);
                }}>
                {({ values }) => (
                    <Form.Element>
                        <Form.FieldSection
                            label="Contact Info"
                            tip="Please only enter the contact information that you're comfortable sharing">
                            <Form.FieldArray name="contact">
                                {arrayHelpers => (
                                    <>
                                        <Form.Grid gridColumns="1fr 2fr 2rem">
                                            {values.contact &&
                                                values.contact.length > 0 &&
                                                values.contact.map((contact, i) => (
                                                    <React.Fragment key={uuidv4()}>
                                                        <S.GridLeft>
                                                            <Form.Field.Input
                                                                name={`contact[${i}].name`}
                                                                placeholder="Contact method"
                                                            />
                                                        </S.GridLeft>
                                                        <S.GridRight>
                                                            <Form.Field.Input
                                                                name={`contact[${i}].value`}
                                                                placeholder="Details"
                                                            />
                                                        </S.GridRight>
                                                        <Form.DeleteButton
                                                            onClick={() => arrayHelpers.remove(i)}
                                                        />
                                                    </React.Fragment>
                                                ))}
                                        </Form.Grid>
                                        <Form.AddMore
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    name: '',
                                                    value: '',
                                                })
                                            }
                                            placeholder="Add contact"
                                        />
                                    </>
                                )}
                            </Form.FieldArray>
                        </Form.FieldSection>
                        <Form.HorizontalDivider />
                        <Form.FieldSection
                            label="Socials"
                            tip="Please pick some of your social media that you'd like to share">
                            <Form.FieldArray name="socials">
                                {arrayHelpers => (
                                    <>
                                        <Form.Grid gridColumns="1fr 2fr 2rem">
                                            {values.socials &&
                                                values.socials.length > 0 &&
                                                values.socials.map((social, i) => (
                                                    <React.Fragment key={uuidv4()}>
                                                        <S.GridLeft>
                                                            <Form.Field.Input
                                                                name={`socials[${i}].name`}
                                                                placeholder="Name"
                                                            />
                                                        </S.GridLeft>
                                                        <S.GridRight>
                                                            <Form.Field.Input
                                                                name={`socials[${i}].value`}
                                                                placeholder="Link to your profile"
                                                            />
                                                        </S.GridRight>
                                                        <Form.DeleteButton
                                                            onClick={() => arrayHelpers.remove(i)}
                                                        />
                                                    </React.Fragment>
                                                ))}
                                        </Form.Grid>
                                        <Form.AddMore
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    name: '',
                                                    value: '',
                                                })
                                            }
                                            placeholder="Add social"
                                        />
                                    </>
                                )}
                            </Form.FieldArray>
                        </Form.FieldSection>
                        <Form.Buttons withCancel onCancel={() => setIsEditing(false)} />
                    </Form.Element>
                )}
            </Form>
        </>
    );
};

ContactForm.propTypes = propTypes;

export default ContactForm;
