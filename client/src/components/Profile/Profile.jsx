import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Main, Spinner } from 'shared/components';
import {
    getProfileByUsername,
    selectIsProfileLoading,
    selectProfileAvatar,
    selectProfileCoverImage,
    selectProfileInfo,
    selectProfileUser,
    selectProfileSocial,
    selectProfileEducation,
    selectProfileExperience,
    selectProfileSkills,
} from 'redux/profiles';
import {
    TopCardContainer,
    TopCardContentContainer,
    CoverImage,
    CoverImageContainer,
    AvatarContainer,
    Avatar,
    Name,
    Headline,
    Location,
} from './ProfileStyles';

const propTypes = {
    avatar: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileUser: PropTypes.object.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    avatar: selectProfileAvatar,
    coverImage: selectProfileCoverImage,
    profileInfo: selectProfileInfo,
    profileUser: selectProfileUser,
});

const mapDispatchToProps = {
    getProfileByUsername,
};

const Profile = ({ getProfileByUsername, avatar, coverImage, profileInfo, profileUser }) => {
    const { username } = useParams();
    const { headline, status, location, website, github_username, company } = profileInfo;
    const { name, email } = profileUser;

    // TODO: delete?
    // const [isFirstRender, setIsFirstRender] = useState(true);
    // useEffect(() => {
    // setIsFirstRender(false);
    // }, []);

    useEffect(() => {
        getProfileByUsername(username);
    }, [getProfileByUsername, username]);

    // TODO: add loader
    return (
        <Main>
            <TopCardContainer>
                <CoverImageContainer>
                    <CoverImage
                        src={[
                            `http://localhost:5000/img/profile/cover_image/${coverImage}`,
                            ` http://localhost:5000/img/profile/cover_image/default.jpg`,
                        ]}
                        alt="Profile cover"
                    />
                </CoverImageContainer>
                <TopCardContentContainer>
                    <div>
                        <AvatarContainer>
                            <Avatar
                                src={[
                                    `http://localhost:5000/img/profile/avatar/${avatar}`,
                                    `http://localhost:5000/img/profile/avatar/default.jpg`,
                                ]}
                                alt="Profile avatar"
                            />
                        </AvatarContainer>
                        <Name>{name}</Name>
                        <Headline>{headline}</Headline>
                        <Location>{location}</Location>
                    </div>
                </TopCardContentContainer>
            </TopCardContainer>
        </Main>
    );
};

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// TODO: delete
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Link, useParams } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { isEmpty } from 'lodash';
// import { createStructuredSelector } from 'reselect';
// import { Spinner } from 'shared/components';
// import {
//     getProfile,
//     selectIsProfileLoading,
//     selectProfileUser,
//     selectProfileAbout,
//     selectProfileSocial,
//     selectProfileEducation,
//     selectProfileExperience,
//     selectProfileSkills,
// } from 'redux/profiles';
// import { selectIsAuthenticated, selectIsUserLoading, selectUser } from 'redux/auth';
// import ProfileTop from './ProfileTop/ProfileTop';

// const Profile = ({
//     getProfile,
//     isProfileLoading,
//     profileUser,
//     profileAbout,
//     profileSocial,
//     profileEducation,
//     profileExperience,
//     isAuthenticated,
//     isUserLoading,
//     user,
// }) => {
//     const params = useParams();
//     const [isFirstRender, setIsFirstRender] = useState(true);

//     useEffect(() => {
//         getProfile(params.id);
//         setIsFirstRender(false);
//     }, [getProfile, params.id]);

//     return (
//         <>
//             {isFirstRender || isEmpty(profile) || isUserLoading || isProfileLoading ? (
//                 <Spinner />
//             ) : (
//                 <>
//                     <Link to="/profiles" className="btn btn-light">
//                         Back To Profiles
//                     </Link>
//                     {isAuthenticated && isUserLoading === false && user._id === profileUser._id && (
//                         <Link to="/edit" className="btn btn-dark">
//                             Edit Profile
//                         </Link>
//                     )}
//                     <div className="profile-grid my-1">
//                         <ProfileTop
//                             profileInfo={profileInfo}
//                             profileUser={profileUser}
//                             profileSocial={profileSocial}
//                         />
//                         <ProfileAbout
//                             profileInfo={profileInfo}
//                             profileUser={profileUser}
//                             skillsArr={profileSkills}
//                         />
//                         <div className="profile-exp bg-white p-2">
//                             <h2 className="text-primary">Experience</h2>
//                             {profileExperience.length > 0 ? (
//                                 <>
//                                     {profileExperience.map(experience => (
//                                         <ProfileExperience
//                                             key={experience._id}
//                                             experience={experience}
//                                         />
//                                     ))}
//                                 </>
//                             ) : (
//                                 <h4>No experience credentials</h4>
//                             )}
//                         </div>

//                         <div className="profile-edu bg-white p-2">
//                             <h2 className="text-primary">Education</h2>
//                             {profileEducation.length > 0 ? (
//                                 <>
//                                     {profileEducation.map(education => (
//                                         <ProfileEducation
//                                             key={education._id}
//                                             education={education}
//                                         />
//                                     ))}
//                                 </>
//                             ) : (
//                                 <h4>No education credentials</h4>
//                             )}
//                         </div>

//                         {profileInfo.github_username && (
//                             <ProfileGithub github_username={profileInfo.github_username} />
//                         )}
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// Profile.propTypes = {
//     getProfile: PropTypes.func.isRequired,
//     isProfileLoading: PropTypes.bool.isRequired,
//     profileUser: PropTypes.object.isRequired,
//     profileAbout: PropTypes.object.isRequired,
//     profileSocial: PropTypes.object.isRequired,
//     profileEducation: PropTypes.array.isRequired,
//     profileExperience: PropTypes.array.isRequired,
//     isAuthenticated: PropTypes.bool.isRequired,
//     isUserLoading: PropTypes.bool.isRequired,
//     user: PropTypes.object.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//     isProfileLoading: selectIsProfileLoading,
//     profileUser: selectProfileUser,
//     profileAbout: selectProfileAbout,
//     profileSocial: selectProfileSocial,
//     profileEducation: selectProfileEducation,
//     profileExperience: selectProfileExperience,
//     profileSkills: selectProfileSkills,
//     isAuthenticated: selectIsAuthenticated,
//     isUserLoading: selectIsUserLoading,
//     user: selectUser,
// });

// export default connect(mapStateToProps, { getProfile })(Profile);
