import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Main, Spinner } from 'shared/components';
import { useIsFirstRender } from 'shared/hooks';
import {
    getProfileByUsername,
    selectIsProfileLoading,
    setIsCurrentUser,
    selectIsProfileEmpty,
    selectIsCurrentUser,
} from 'redux/profile';
import { selectUserUsername, selectIsUserActive } from 'redux/auth';
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
    getProfileByUsername: PropTypes.func.isRequired,
    setIsCurrentUser: PropTypes.func.isRequired,
    isProfileEmpty: PropTypes.bool.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    currentUserUsername: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = createStructuredSelector({
    profileIsLoading: selectIsProfileLoading,
    isProfileEmpty: selectIsProfileEmpty,
    isCurrentUser: selectIsCurrentUser,
    currentUserUsername: selectUserUsername,
    isUserActive: selectIsUserActive,
});

const mapDispatchToProps = {
    getProfileByUsername,
    setIsCurrentUser,
};

const Profile = ({
    getProfileByUsername,
    setIsCurrentUser,
    profileIsLoading,
    isProfileEmpty,
    isCurrentUser,
    currentUserUsername,
}) => {
    const history = useHistory();
    const isFirstRender = useIsFirstRender();
    const { username } = useParams();

    useEffect(() => {
        getProfileByUsername(username);
    }, [getProfileByUsername, username]);

    useEffect(() => {
        if (currentUserUsername === username) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, [currentUserUsername, setIsCurrentUser, username]);

    return (
        <Main>
            {isProfileEmpty && !isFirstRender && !profileIsLoading ? (
                isCurrentUser ? (
                    <ProfileTopForm
                        isOpen
                        renderLink={() => {}}
                        onClose={() => history.push('/')}
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
