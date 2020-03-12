import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { createStructuredSelector } from 'reselect';
import {
    Spinner,
    ProfileTop,
    ProfileAbout,
    ProfileExperience,
    ProfileEducation,
    ProfileGithub,
} from 'components';
import {
    getProfileById,
    getCurrentProfile,
    selectProfileLoading,
    selectProfileUser,
    selectProfileData,
    selectProfileInfo,
    selectProfileSocial,
    selectProfileEducation,
    selectProfileExperience,
    selectProfileSkillsArr,
} from 'redux/profile';
import { selectIsAuthenticated, selectIsAuthLoading, selectUserData } from 'redux/auth';

const Profile = ({
    getProfileById,
    profileLoading,
    profileData,
    profileUser,
    profileInfo,
    profileSocial,
    profileEducation,
    profileExperience,
    profileSkillsArr,
    isAuthenticated,
    isAuthLoading,
    userData,
}) => {
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getProfileById(params.id);
        } else {
            getCurrentProfile();
        }
    }, [getProfileById, params.id]);
    console.log(profileUser);
    return (
        <>
            {isEmpty(profileData) || isAuthLoading || profileLoading ? (
                <Spinner />
            ) : (
                <>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {isAuthenticated &&
                        isAuthLoading === false &&
                        userData._id === profileUser._id && (
                            <Link to="/edit" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )}
                    <div className="profile-grid my-1">
                        <ProfileTop
                            profileInfo={profileInfo}
                            profileUser={profileUser}
                            profileSocial={profileSocial}
                        />
                        <ProfileAbout
                            profileInfo={profileInfo}
                            profileUser={profileUser}
                            skillsArr={profileSkillsArr}
                        />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profileExperience.length > 0 ? (
                                <>
                                    {profileExperience.map(experience => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profileEducation.length > 0 ? (
                                <>
                                    {profileEducation.map(education => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>

                        {profileInfo.github_username && (
                            <ProfileGithub githubUsername={profileInfo.github_username} />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    profileUser: PropTypes.object.isRequired,
    profileData: PropTypes.object.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileSocial: PropTypes.object.isRequired,
    profileEducation: PropTypes.object.isRequired,
    profileExperience: PropTypes.object.isRequired,
    profileSkillsArr: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileLoading: selectProfileLoading,
    profileUser: selectProfileUser,
    profileData: selectProfileData,
    profileInfo: selectProfileInfo,
    profileSocial: selectProfileSocial,
    profileEducation: selectProfileEducation,
    profileExperience: selectProfileExperience,
    profileSkillsArr: selectProfileSkillsArr,
    isAuthenticated: selectIsAuthenticated,
    isAuthLoading: selectIsAuthLoading,
    userData: selectUserData,
});

export default connect(mapStateToProps, { getProfileById, getCurrentProfile })(Profile);
