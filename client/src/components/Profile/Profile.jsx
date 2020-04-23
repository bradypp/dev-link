import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Main } from 'shared/components';
import { getProfileByUsername } from 'redux/profile';
import {
    ProfileTop,
    ProfileAbout,
    ProfilePortfolio,
    ProfileEducation,
    ProfileExperience,
} from 'components';
import * as S from './ProfileStyles';

const propTypes = {
    getProfileByUsername: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    getProfileByUsername,
};

const Profile = ({ getProfileByUsername }) => {
    const { username } = useParams();

    useEffect(() => {
        getProfileByUsername(username);
    }, [getProfileByUsername, username]);

    // TODO: Conditional appearance for different components/buttons (such as contact, social & education etc) based on if profile belongs to current authenticated user or not. If it is the currently authenticated users profile, have prompts to edit/add profile info, that's if they haven't already clicked to remove that from their profile?
    // TODO: conditionally render components if viewed by other users & component is empty?
    // TODO: add loaders/don't render components while loading
    return (
        <Main>
            <S.ProfileContainer>
                <ProfileTop />
                <ProfileAbout />
                <ProfilePortfolio />
                <ProfileExperience />
                <ProfileEducation />
            </S.ProfileContainer>
            {/* profile sidebar */}
        </Main>
    );
};

Profile.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Profile);
