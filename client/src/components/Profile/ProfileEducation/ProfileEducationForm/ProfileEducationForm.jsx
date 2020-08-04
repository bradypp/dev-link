import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from 'redux/profile';
import { Form } from 'shared/components';
import { EditModal } from 'components';
import { validators, dateTime } from 'shared/utils';
import * as Yup from 'yup';
import * as S from './ProfileEducationFormStyles';

const propTypes = {
    education: PropTypes.array.isRequired,
    updateProfile: PropTypes.func.isRequired,
    index: PropTypes.number,
};

const defaultProps = {
    index: undefined,
};

const mapDispatchToProps = {
    updateProfile,
};

const ProfileEducationForm = ({ updateProfile, education, index, ...otherProps }) => {
    const initialValues =
        typeof index === 'number'
            ? education[index]
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

    const subjectsKey = uuidv4();

    const educationValidation = Yup.object().shape({
        school: validators.required('School name is required'),
        subjects: Yup.array()
            .of(
                Yup.object().shape({
                    title: validators.required('Subject is required'),
                }),
            )
            .required('Must at least one subject'),
        from: validators.date('From date is required'),
        to: validators.to,
    });

    return (
        <EditModal
            {...otherProps}
            onDelete={() => {
                education.splice(index, 1);
                updateProfile({ education });
            }}
            renderContent={({ close }) => (
                <>
                    <h2>Edit Education</h2>
                    <Form
                        initialValues={{
                            ...initialValues,
                            from: dateTime.formatDate(initialValues.from),
                            to: dateTime.formatDate(initialValues.to),
                        }}
                        validationSchema={educationValidation}
                        onSubmit={values => {
                            const newArray = [...education];
                            const newValues = {
                                ...values,
                                from: dateTime.formatDateTimeForAPI(values.from),
                                to: dateTime.formatDateTimeForAPI(values.to),
                            };

                            if (typeof index === 'number') {
                                newArray[index] = newValues;
                            } else {
                                newArray.push(newValues);
                            }
                            updateProfile({ education: newArray });
                            close();
                        }}>
                        {({ values }) => (
                            <Form.Element>
                                <Form.Field.Input
                                    tip="Please enter the name of the school/organization/institution that you attended"
                                    label="Education provider *"
                                    name="school"
                                />
                                <Form.Flex>
                                    <Form.Field.Input
                                        label="Provider type"
                                        tip="Examples include university, bootcamp, online courses etc."
                                        name="school_type"
                                    />
                                    <Form.Field.Input
                                        label="Qualification type"
                                        tip="What type of qualification did you earn?"
                                        name="qualification_type"
                                    />
                                </Form.Flex>
                                <Form.Field.TextArea
                                    label="Description"
                                    tip="Write a few sentences describing your most valuable learning experiences"
                                    name="description"
                                />
                                <Form.FieldContainer
                                    label="Subjects *"
                                    tip="What subjects did you study?">
                                    <Form.FieldArray name="subjects">
                                        {arrayHelpers => (
                                            <>
                                                <Form.Grid gridColumns="1fr 1fr 2rem">
                                                    {values.subjects &&
                                                        values.subjects.length > 0 &&
                                                        values.subjects.map((subject, i) => (
                                                            <React.Fragment key={subjectsKey}>
                                                                <div style={{ gridColumn: 1 / 2 }}>
                                                                    <Form.Field.Input
                                                                        name={`subjects[${i}].title`}
                                                                        placeholder="Subject"
                                                                    />
                                                                </div>
                                                                <div style={{ gridColumn: 2 / 3 }}>
                                                                    <Form.Field.Input
                                                                        name={`subjects[${i}].grade`}
                                                                        placeholder="Grade (optional)"
                                                                    />
                                                                </div>
                                                                <Form.DeleteButton
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(i)
                                                                    }
                                                                />
                                                            </React.Fragment>
                                                        ))}
                                                </Form.Grid>
                                                <Form.AddMore
                                                    onClick={() =>
                                                        arrayHelpers.push({
                                                            title: '',
                                                            grade: '',
                                                        })
                                                    }
                                                    placeholder="Add subject"
                                                />
                                            </>
                                        )}
                                    </Form.FieldArray>
                                </Form.FieldContainer>
                                <Form.Grid>
                                    <Form.Field.Input
                                        label="From *"
                                        tip="When did you start?"
                                        name="from"
                                        placeholder="MM/DD/YYYY"
                                    />
                                    {!values.current && (
                                        <Form.Field.Input
                                            label="To *"
                                            tip="When did you finish?"
                                            name="to"
                                            placeholder="MM/DD/YYYY"
                                        />
                                    )}
                                    <S.FormCheckbox
                                        style={{ gridColumn: 1 / 2 }}
                                        type="checkbox"
                                        label="Are you still studying?"
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

ProfileEducationForm.propTypes = propTypes;
ProfileEducationForm.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(ProfileEducationForm);
