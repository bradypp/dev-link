import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { v4 as uuidv4 } from 'uuid';
import { Form } from 'shared/components';
import { getProfiles, getSkills, selectSkills } from 'redux/profiles';
import * as S from './ProfilesFormStyles';

const propTypes = {
    getProfiles: PropTypes.func.isRequired,
    getSkills: PropTypes.func.isRequired,
    skills: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    skills: selectSkills,
});

const mapDispatchToProps = {
    getProfiles,
    getSkills,
};

const ProfilesForm = ({ getProfiles, getSkills, skills }) => {
    useEffect(() => {
        getProfiles();
        getSkills();
    }, []);

    // const skillsOptions = () => {
    //     skills && typeof skills === 'set'
    //         ? skills.map(skill => ({ label: skill, value: skill }))
    //         : [];
    // };

    return (
        <S.ProfilesFormContainer>
            <Form
                initialValues={{ skills: [] }}
                onSubmit={values => {
                    getProfiles({ [`skills[in]`]: values.skills });
                }}>
                <Form.Element>
                    <Form.Field.Select
                        label="Skills"
                        valuePlaceholder="Filter by skill"
                        submitOnChange
                        name="skills"
                        variant="empty"
                        isMulti
                        options={
                            skills.length > 0
                                ? skills.map(skill => ({ label: skill, value: skill }))
                                : []
                        }
                    />
                </Form.Element>
            </Form>
        </S.ProfilesFormContainer>
    );
};

ProfilesForm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesForm);
