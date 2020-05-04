import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from 'redux/profile';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { validators, dateTime } from 'shared/utils';
import * as Yup from 'yup';
import * as S from './ProfileExperienceFormStyles';

const propTypes = {
    experience: PropTypes.array.isRequired,
    updateProfile: PropTypes.func.isRequired,
    index: PropTypes.number,
};

const defaultProps = {
    index: undefined,
};

const mapDispatchToProps = {
    updateProfile,
};

const ProfileExperienceForm = ({ updateProfile, experience, index, ...otherProps }) => {
    const initialValues =
        typeof index === 'number'
            ? experience[index]
            : {
                  school: '',
                  school_type: '',
                  qualification_type: '',
                  subjects: [],
                  from: '',
                  to: '',
                  current: false,
                  description: '',
              };

    const experienceValidation = Yup.object().shape({
        title: validators.required('Role title is required'),
        company: validators.required('Company is required'),
        from: validators.date('From date is required'),
        to: validators.to,
    });

    return (
        <EditModal
            {...otherProps}
            onDelete={() => {
                experience.splice(index, 1);
                updateProfile({ experience });
            }}
            renderContent={({ close }) => (
                <>
                    <h2>Edit Experience</h2>
                    <Form
                        initialValues={{
                            ...initialValues,
                            from: dateTime.formatDate(initialValues.from),
                            to: dateTime.formatDate(initialValues.to),
                        }}
                        validationSchema={experienceValidation}
                        onSubmit={values => {
                            const newArray = [...experience];
                            if (index) {
                                newArray[index] = values;
                            } else {
                                newArray.push(values);
                            }
                            updateProfile({ experience: newArray });
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.Input
                                    tip="Please your role title"
                                    label="Role title *"
                                    name="title"
                                />
                                <Form.Flex>
                                    <Form.Field.Input
                                        label="Employer *"
                                        tip="Who did you work for?"
                                        name="company"
                                    />
                                    <Form.Field.Input
                                        label="Location"
                                        tip="Where were you based?"
                                        name="location"
                                    />
                                </Form.Flex>
                                <Form.Field.TextArea
                                    label="Description"
                                    tip="Write a few sentences describing your key contributions in this role"
                                    name="description"
                                />
                                <Form.Grid>
                                    <Form.Field.Input
                                        label="From *"
                                        tip="When did you start?"
                                        name="from"
                                        placeholder="DD/MM/YYYY"
                                    />
                                    {!values.current && (
                                        <Form.Field.Input
                                            label="To *"
                                            tip="When did you finish?"
                                            name="to"
                                            placeholder="DD/MM/YYYY"
                                        />
                                    )}
                                    <S.FormCheckbox
                                        style={{ gridColumn: 1 / 2 }}
                                        type="checkbox"
                                        label="Are you still working here?"
                                        name="current"
                                    />
                                </Form.Grid>
                                <Form.Buttons withCancel onCancel={close} />
                            </Form.Element>
                        )}
                    </Form>
                </>
            )}
        />
    );
};

ProfileExperienceForm.propTypes = propTypes;
ProfileExperienceForm.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(ProfileExperienceForm);
