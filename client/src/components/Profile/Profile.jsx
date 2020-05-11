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
    selectIsProfileEmpty,
} from 'redux/profile';
import { selectUserId } from 'redux/auth';
import {
    ProfileTop,
    ProfileAbout,
    ProfilePortfolio,
    ProfileEducation,
    ProfileCertifications,
    ProfileExperience,
    RecommendedProfiles,
} from 'components';
import * as S from './ProfileStyles';

const propTypes = {
    profileIsLoading: PropTypes.bool.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
    setIsCurrentUser: PropTypes.func.isRequired,
    profileUserId: PropTypes.string.isRequired,
    isProfileEmpty: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string,
};

const defaultProps = {
    currentUserId: undefined,
};

const mapStateToProps = createStructuredSelector({
    profileIsLoading: selectIsProfileLoading,
    profileUserId: selectProfileUserId,
    currentUserId: selectUserId,
    isProfileEmpty: selectIsProfileEmpty,
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
    isProfileEmpty,
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

    return (
        <Main>
            {/* TODO: add not found page */}
            {isProfileEmpty && !isFirstRender && !profileIsLoading ? (
                <div>profile not found</div>
            ) : (
                <>
                    <S.ProfileContainer>
                        {isFirstRender || profileIsLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <ProfileTop />
                                <ProfileAbout />
                                <ProfilePortfolio />
                                <ProfileExperience />
                                <ProfileEducation />
                                <ProfileCertifications />
                            </>
                        )}
                    </S.ProfileContainer>
                    <S.SidebarContainer>
                        {!isFirstRender && !profileIsLoading && <RecommendedProfiles />}
                    </S.SidebarContainer>
                </>
            )}
        </Main>
    );
};

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
