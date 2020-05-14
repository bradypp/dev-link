import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Main, Spinner, Button } from 'shared/components';
import { useIsFirstRender } from 'shared/hooks';
import {
    getProfileByUsername,
    selectIsProfileLoading,
    setIsCurrentUser,
    selectIsProfileEmpty,
    selectIsCurrentUser,
    getCurrentUserProfile,
    resetProfile,
} from 'redux/profile';
import {
    selectUserUsername,
    selectIsUserActive,
    selectIsAuthenticated,
    selectIsUserLoading,
    loadUser,
} from 'redux/auth';
import {
    ProfileTop,
    ProfileAbout,
    ProfilePortfolio,
    ProfileEducation,
    ProfileCertifications,
    ProfileExperience,
    RecommendedProfiles,
} from 'components';
import ProfileTopForm from './ProfileTop/ProfileTopForm/ProfileTopForm';
import * as S from './ProfileStyles';

const propTypes = {
    profileIsLoading: PropTypes.bool.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
    isUserLoading: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    resetProfile: PropTypes.func.isRequired,
    setIsCurrentUser: PropTypes.func.isRequired,
    isProfileEmpty: PropTypes.bool.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    currentUserUsername: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const defaultProps = {};

const mapStateToProps = createStructuredSelector({
    profileIsLoading: selectIsProfileLoading,
    isProfileEmpty: selectIsProfileEmpty,
    isCurrentUser: selectIsCurrentUser,
    currentUserUsername: selectUserUsername,
    isUserActive: selectIsUserActive,
    isAuthenticated: selectIsAuthenticated,
    isUserLoading: selectIsUserLoading,
});

const mapDispatchToProps = {
    getProfileByUsername,
    setIsCurrentUser,
    getCurrentUserProfile,
    resetProfile,
    loadUser,
};

const Profile = ({
    getProfileByUsername,
    setIsCurrentUser,
    profileIsLoading,
    isProfileEmpty,
    isCurrentUser,
    currentUserUsername,
    getCurrentUserProfile,
    isAuthenticated,
    resetProfile,
    isUserLoading,
    loadUser,
}) => {
    const history = useHistory();
    const isFirstRender = useIsFirstRender();
    const { username } = useParams();

    useEffect(() => {
        if (username) {
            getProfileByUsername(username);
        } else if (isAuthenticated) {
            getCurrentUserProfile();
        }

        return () => {
            if (username) {
                resetProfile();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProfileByUsername, username]);

    useEffect(() => {
        if (!username || currentUserUsername === username) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [currentUserUsername, setIsCurrentUser, username]);

    useEffect(() => {
        if (!isAuthenticated) {
            loadUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handles for route /profile without a username
    if (!username) {
        return isAuthenticated || isUserLoading ? (
            currentUserUsername ? (
                <Redirect to={`/profile/${currentUserUsername}`} />
            ) : (
                <Main>
                    <S.ProfileContainer>
                        <Spinner />
                    </S.ProfileContainer>
                </Main>
            )
        ) : (
            <Redirect to="developers" />
        );
    }

    return (
        <Main>
            {isProfileEmpty && !isFirstRender && !profileIsLoading ? (
                isCurrentUser ? (
                    <ProfileTopForm
                        isOpen
                        renderLink={({ open }) => (
                            <Button backgroundColor="primary" onClick={open}>
                                Create Profile
                            </Button>
                        )}
                        onClose={() => history.push('/developers')}
                        isEdit={false}
                    />
                ) : (
                    <div>profile not found</div>
                )
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
