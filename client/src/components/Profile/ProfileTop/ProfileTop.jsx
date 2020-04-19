import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IoMdEye, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import Image from 'react-image';
import {
    selectProfileAvatar,
    selectProfileCoverImage,
    selectProfileInfo,
    selectProfileUser,
    selectProfileStars,
    selectProfileWatchers,
    selectProfileContact,
    selectProfileSocials,
    selectProfileSkills,
    toggleStar,
    toggleWatch,
} from 'redux/profiles';
import { selectUser, selectIsAuthenticated } from 'redux/auth';
import { setAlert } from 'redux/alerts';
import Contact from './Contact/Contact';
import Socials from './Socials/Socials';
import * as S from './ProfileTopStyles';

const propTypes = {
    toggleStar: PropTypes.func.isRequired,
    toggleWatch: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileUser: PropTypes.object.isRequired,
    profileStars: PropTypes.array.isRequired,
    profileWatchers: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    profileContact: PropTypes.object.isRequired,
    profileSocials: PropTypes.array.isRequired,
    profileSkills: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    avatar: selectProfileAvatar,
    coverImage: selectProfileCoverImage,
    currentUser: selectUser,
    profileInfo: selectProfileInfo,
    profileUser: selectProfileUser,
    profileStars: selectProfileStars,
    profileWatchers: selectProfileWatchers,
    isAuthenticated: selectIsAuthenticated,
    profileContact: selectProfileContact,
    profileSocials: selectProfileSocials,
    profileSkills: selectProfileSkills,
});

const mapDispatchToProps = {
    toggleStar,
    toggleWatch,
    setAlert,
};

const ProfileTop = ({
    avatar,
    coverImage,
    currentUser,
    profileInfo,
    profileUser,
    profileStars,
    profileWatchers,
    toggleStar,
    toggleWatch,
    isAuthenticated,
    setAlert,
    profileSocials,
    profileContact,
    profileSkills,
}) => {
    const {
        headline,
        current_position,
        city,
        country,
        website,
        github_username,
        company,
    } = profileInfo;
    const { name } = profileUser;

    const toggleWatchHandler = () => {
        if (isAuthenticated) {
            toggleWatch(profileInfo._id);
        } else {
            setAlert('You must be signed in to watch a profile!');
        }
    };
    const toggleStarHandler = () => {
        if (isAuthenticated) {
            toggleStar(profileInfo._id);
        } else {
            setAlert('You must be signed in to star a profile!');
        }
    };

    const starredByCurrentUser = profileStars.includes(currentUser._id);
    const watchedByCurrentUser = profileWatchers.includes(currentUser._id);

    // TODO: Add contact/socials popup & do button styling (add icon?) in separate sub-components
    // TODO: Watching/stars numbers hover effect and on click functionality
    // TODO: Add links to skills to profiles page filtered for that skill?
    // TODO: Add message button?

    return (
        <S.ProfileTopCard>
            <S.CoverImageContainer>
                <Image
                    src={[
                        `http://localhost:5000/img/profile/cover_image/${coverImage}`,
                        ` http://localhost:5000/img/profile/cover_image/default.jpg`,
                    ]}
                    alt="Profile cover"
                />
            </S.CoverImageContainer>
            <S.ContentContainer>
                <S.ContentLeftContainer>
                    <S.AvatarContainer>
                        <S.Avatar
                            className="avatar"
                            src={[
                                `http://localhost:5000/img/profile/avatar/${avatar}`,
                                `http://localhost:5000/img/profile/avatar/default.jpg`,
                            ]}
                            alt="Profile avatar"
                        />
                    </S.AvatarContainer>
                    <h1>{name}</h1>
                    {headline && <h2>{headline}</h2>}
                    {city ? (
                        <h3>
                            {city}
                            {country && <>, {country}</>}
                        </h3>
                    ) : (
                        <>{country && <h3>{country}</h3>}</>
                    )}
                    {company ? (
                        <h3>
                            {company}
                            {current_position && <> &middot; {current_position}</>}
                        </h3>
                    ) : (
                        <>{current_position && <h3>{current_position}</h3>}</>
                    )}
                    <S.InfoButtonsContainer>
                        <Contact name={name} profileContact={profileContact} /> &middot;
                        <Socials name={name} profileSocials={profileSocials} />
                        &middot; <a href={website}>Website</a>
                        &middot; <a href={`https://github.com/${github_username}`}>GitHub</a>
                    </S.InfoButtonsContainer>
                </S.ContentLeftContainer>
                <S.ContentRightContainer>
                    <S.ToggleButtonsContainer>
                        <S.ToggleButton icon={IoMdEye} onClick={toggleWatchHandler}>
                            {watchedByCurrentUser ? `Unwatch` : `Watch`}
                        </S.ToggleButton>
                        <S.CountContainer>{profileWatchers.length}</S.CountContainer>
                        <S.ToggleButton
                            icon={starredByCurrentUser ? IoMdStar : IoMdStarOutline}
                            onClick={toggleStarHandler}>
                            {starredByCurrentUser ? `Unstar` : `Star`}
                        </S.ToggleButton>
                        <S.CountContainer>{profileStars.length}</S.CountContainer>
                    </S.ToggleButtonsContainer>
                    <S.SkillsContainer>
                        {profileSkills.map(skill => (
                            <S.SkillLink to="#" key={uuidv4()}>
                                {skill}
                            </S.SkillLink>
                        ))}
                    </S.SkillsContainer>
                </S.ContentRightContainer>
            </S.ContentContainer>
        </S.ProfileTopCard>
    );
};

ProfileTop.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTop);
