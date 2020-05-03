import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';

const propTypes = {
    formData: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired,
};

export const ContactForm = ({ updateProfile, formData, setIsEditing }) => {
    const { socials, contact } = formData;
    const contactKey = uuidv4();
    const socialsKey = uuidv4();

    const contactValidation = Yup.object().shape({
        contact: Yup.array().of(
            Yup.object().shape({
                name: validators.required('Name is required'),
                value: validators.required('Field is required'),
            }),
        ),
        socials: Yup.array().of(
            Yup.object().shape({
                name: validators.required('Name is required'),
                value: validators.required('Link is required'),
            }),
        ),
    });

    return (
        <>
            <h2>Edit Contact Info</h2>
            <Form
                initialValues={{
                    socials,
                    contact,
                }}
                validationSchema={contactValidation}
                onSubmit={values => {
                    setIsEditing(false);
                    updateProfile(values);
                }}>
                {({ values }) => (
                    <Form.Element>
                        <Form.FieldContainer
                            label="Contact Info"
                            tip="Please enter any contact information that you're comfortable with sharing">
                            <Form.FieldArray name="contact">
                                {arrayHelpers => (
                                    <>
                                        <Form.Grid gridColumns="1fr 2fr 2rem">
                                            {values.contact &&
                                                values.contact.length > 0 &&
                                                values.contact.map((contact, i) => (
                                                    <React.Fragment key={contactKey}>
                                                        <div style={{ gridColumn: 1 / 2 }}>
                                                            <Form.Field.Input
                                                                name={`contact[${i}].name`}
                                                                placeholder="Contact method"
                                                            />
                                                        </div>
                                                        <div style={{ gridColumn: 2 / 3 }}>
                                                            <Form.Field.Input
                                                                name={`contact[${i}].value`}
                                                                placeholder="Details"
                                                            />
                                                        </div>
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
                        </Form.FieldContainer>
                        <Form.HorizontalDivider />
                        <Form.FieldContainer
                            label="Socials"
                            tip="Add any social media you'd like to share">
                            <Form.FieldArray name="socials">
                                {arrayHelpers => (
                                    <>
                                        <Form.Grid gridColumns="1fr 2fr 2rem">
                                            {values.socials &&
                                                values.socials.length > 0 &&
                                                values.socials.map((social, i) => (
                                                    <React.Fragment key={socialsKey}>
                                                        <div style={{ gridColumn: 1 / 2 }}>
                                                            <Form.Field.Input
                                                                name={`socials[${i}].name`}
                                                                placeholder="Name"
                                                            />
                                                        </div>
                                                        <div style={{ gridColumn: 2 / 3 }}>
                                                            <Form.Field.Input
                                                                name={`socials[${i}].value`}
                                                                placeholder="Link to your profile"
                                                            />
                                                        </div>
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
                        </Form.FieldContainer>
                        <Form.Buttons withCancel onCancel={() => setIsEditing(false)} />
                    </Form.Element>
                )}
            </Form>
        </>
    );
};

ContactForm.propTypes = propTypes;

export default ContactForm;
