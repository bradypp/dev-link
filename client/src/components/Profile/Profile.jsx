import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Main, Spinner } from 'shared/components';
import { useIsFirstRender } from 'shared/hooks';
import {
    getProfileByUsername,
    selectIsProfileLoading,
    setIsCurrentUser,
    selectProfileUserId,
} from 'redux/profile';
import { selectUserId } from 'redux/auth';
import {
    ProfileTop,
    ProfileAbout,
    ProfilePortfolio,
    ProfileEducation,
    ProfileCertifications,
    ProfileExperience,
    ProfileInterests,
    ProfileGoals,
} from 'components';
import * as S from './ProfileStyles';

const propTypes = {
    profileIsLoading: PropTypes.bool.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
    setIsCurrentUser: PropTypes.func.isRequired,
    profileUserId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileIsLoading: selectIsProfileLoading,
    profileUserId: selectProfileUserId,
    currentUserId: selectUserId,
});

const mapDispatchToProps = {
    getProfileByUsername,
    setIsCurrentUser,
};

const Profile = ({
    getProfileByUsername,
    setIsCurrentUser,
    profileIsLoading,
    currentUserId,
    profileUserId,
}) => {
    const isFirstRender = useIsFirstRender();
    const { username } = useParams();

    useEffect(() => {
        getProfileByUsername(username);
    }, [getProfileByUsername, username]);

    useEffect(() => {
        if (currentUserId === profileUserId) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [profileUserId, currentUserId, setIsCurrentUser]);

    // TODO: Conditional appearance for different components/buttons (such as contact, social & education etc) based on if profile belongs to current authenticated user or not. If it is the currently authenticated users profile, have prompts to edit/add profile info, that's if they haven't already clicked to remove that from their profile?
    // TODO: conditionally render components if viewed by other users & component is empty?
    // TODO: add loaders/don't render components while loading
    // TODO: save render instructions based on user input in mongodb and load them here?
    // TODO: redirect if profile doesn't exist?
    // TODO: put about, goals and interests in one component?
    // TODO: put profile section into its own component away from the profile page (so it can be rendered anywhere without profile page specific stuff such as the sidebar), if you do this move any layout stuff from profile cards to overall profile component (ie the grid settings)
    return (
        <Main>
            <S.ProfileContainer>
                {isFirstRender || profileIsLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <ProfileTop />
                        <ProfileAbout />
                        <ProfileInterests />
                        <ProfileGoals />
                        <ProfilePortfolio />
                        <ProfileExperience />
                        <ProfileEducation />
                        <ProfileCertifications />
                    </>
                )}
            </S.ProfileContainer>
        </Main>
    );
};

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
