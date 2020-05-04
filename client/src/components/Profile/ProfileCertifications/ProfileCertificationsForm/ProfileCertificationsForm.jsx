import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from 'redux/profile';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { validators, dateTime } from 'shared/utils';
import * as Yup from 'yup';
import * as S from './ProfileCertificationsFormStyles';

const propTypes = {
    certifications: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    updateProfile,
};

const ProfileCertificationsForm = ({ updateProfile, certifications, index }) => {
    const initialValues =
        typeof index === 'number'
            ? certifications[index]
            : {
                  title: '',
                  issuer: '',
                  date: '',
                  description: '',
              };

    const experienceValidation = Yup.object().shape({
        title: validators.required('Certification title is required'),
        issuer: validators.required('Issuer is required'),
        date: validators.date('Date is required'),
    });

    return (
        <EditModal
            onDelete={() => {
                certifications.splice(index, 1);
                updateProfile({ certifications });
            }}
            renderContent={({ close }) => (
                <>
                    <h2>Edit Certifications</h2>
                    <Form
                        initialValues={{
                            ...initialValues,
                            from: dateTime.formatDate(initialValues.from),
                            to: dateTime.formatDate(initialValues.to),
                        }}
                        validationSchema={experienceValidation}
                        onSubmit={values => {
                            const newArray = [...certifications];
                            if (index) {
                                newArray[index] = values;
                            } else {
                                newArray.push(values);
                            }
                            updateProfile({ certifications: newArray });
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.Input label="Certification title *" name="title" />
                                <Form.Flex>
                                    <Form.Field.Input
                                        label="Issuer *"
                                        tip="Who is the issuer of your certification?"
                                        name="issuer"
                                    />
                                    <Form.Field.Input
                                        label="Date *"
                                        tip="When did you receive your certification?"
                                        name="date"
                                        placeholder="DD/MM/YYYY"
                                    />
                                </Form.Flex>
                                <Form.Field.TextArea
                                    label="Description"
                                    tip="Write a few sentences describing your key contributions in this role"
                                    name="description"
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

ProfileCertificationsForm.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(ProfileCertificationsForm);
