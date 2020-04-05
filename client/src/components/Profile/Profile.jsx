import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { Spinner } from 'shared/components';
import {
    getProfile,
    selectIsProfileLoading,
    selectProfileUser,
    selectProfile,
    selectProfileInfo,
    selectProfileSocial,
    selectProfileEducation,
    selectProfileExperience,
    selectProfileSkillsArr,
} from 'redux/profiles';
import { selectIsAuthenticated, selectIsUserLoading, selectUser } from 'redux/auth';
import ProfileTop from './ProfileTop/ProfileTop';
import ProfileAbout from './ProfileAbout/ProfileAbout';
import ProfileExperience from './ProfileExperience/ProfileExperience';
import ProfileEducation from './ProfileEducation/ProfileEducation';
import ProfileGithub from './ProfileGithub/ProfileGithub';

const Profile = ({
    getProfile,
    isProfileLoading,
    profileData,
    profileUser,
    profileInfo,
    profileSocial,
    profileEducation,
    profileExperience,
    profileSkillsArr,
    isAuthenticated,
    isUserLoading,
    user,
}) => {
    const params = useParams();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        getProfile(params.id);
        setIsFirstRender(false);
    }, [getProfile, params.id]);

    return (
        <>
            {isFirstRender || isEmpty(profileData) || isUserLoading || isProfileLoading ? (
                <Spinner />
            ) : (
                <>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {isAuthenticated && isUserLoading === false && user._id === profileUser._id && (
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
                            <ProfileGithub github_username={profileInfo.github_username} />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    isProfileLoading: PropTypes.bool.isRequired,
    profileUser: PropTypes.object.isRequired,
    profileData: PropTypes.object.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileSocial: PropTypes.object.isRequired,
    profileEducation: PropTypes.array.isRequired,
    profileExperience: PropTypes.array.isRequired,
    profileSkillsArr: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isUserLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isProfileLoading: selectIsProfileLoading,
    profileUser: selectProfileUser,
    profileData: selectProfile,
    profileInfo: selectProfileInfo,
    profileSocial: selectProfileSocial,
    profileEducation: selectProfileEducation,
    profileExperience: selectProfileExperience,
    profileSkillsArr: selectProfileSkillsArr,
    isAuthenticated: selectIsAuthenticated,
    isUserLoading: selectIsUserLoading,
    user: selectUser,
});

export default connect(mapStateToProps, { getProfile })(Profile);
