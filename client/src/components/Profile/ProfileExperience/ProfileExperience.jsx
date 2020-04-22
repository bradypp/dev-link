import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfileExperience } from 'redux/profiles';
import { CustomLink } from 'shared/components';
import * as S from './ProfileExperienceStyles';

const propTypes = {
    experience: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    experience: selectProfileExperience,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: Sort array by from (on backend)?
// TODO: Use a calendar component to allow choosing of dates?
// TODO: Have a current toggle on form to disable to
const ProfileExperience = ({ experience }) => {
    return (
        <ProfileCard heading="Experience">
            {experience.map(item => {
                const { title } = item;
                return <ProfileCard.Item>experience</ProfileCard.Item>;
            })}
        </ProfileCard>
    );
};

ProfileExperience.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileExperience);
