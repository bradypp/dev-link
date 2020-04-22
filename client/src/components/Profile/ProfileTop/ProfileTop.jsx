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
import { ContactModal, SocialsModal } from 'components';
import * as S from './ProfileTopStyles';

const propTypes = {
    toggleStar: PropTypes.func.isRequired,
    toggleWatch: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    avatar: PropTypes.object.isRequired,
    coverImage: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileUser: PropTypes.object.isRequired,
    stars: PropTypes.array.isRequired,
    watchers: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    contact: PropTypes.object.isRequired,
    socials: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    avatar: selectProfileAvatar,
    coverImage: selectProfileCoverImage,
    currentUser: selectUser,
    profileInfo: selectProfileInfo,
    profileUser: selectProfileUser,
    stars: selectProfileStars,
    watchers: selectProfileWatchers,
    isAuthenticated: selectIsAuthenticated,
    contact: selectProfileContact,
    socials: selectProfileSocials,
    skills: selectProfileSkills,
});

const mapDispatchToProps = {
    toggleStar,
    toggleWatch,
    setAlert,
};

// TODO: add available toggle & display in ui
const ProfileTop = ({
    avatar,
    coverImage,
    currentUser,
    profileInfo,
    profileUser,
    stars,
    watchers,
    toggleStar,
    toggleWatch,
    isAuthenticated,
    setAlert,
    socials,
    contact,
    skills,
}) => {
    const {
        headline,
        current_position: currentPosition,
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

    const starredByCurrentUser = stars.includes(currentUser._id);
    const watchedByCurrentUser = watchers.includes(currentUser._id);

    // TODO: Add contact/socials popup & do button styling (add icon?) in separate sub-components
    // TODO: Watching/stars numbers hover effect and on click functionality
    // TODO: Add links to skills to profiles page filtered for that skill?
    // TODO: Add message button?

    return (
        <S.ProfileTopCard>
            <S.CoverImageContainer>
                <Image
                    src={[
                        `http://localhost:5000/img/profile/cover_image/${coverImage.medium}`,
                        ` http://localhost:5000/img/profile/cover_image/default-medium.jpg`,
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
                                `http://localhost:5000/img/profile/avatar/${avatar.small}`,
                                `http://localhost:5000/img/profile/avatar/default-small.jpg`,
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
                            {currentPosition && <> &middot; {currentPosition}</>}
                        </h3>
                    ) : (
                        <>{currentPosition && <h3>{currentPosition}</h3>}</>
                    )}
                    <S.InfoButtonsContainer>
                        <ContactModal name={name} contact={contact} /> &middot;
                        <SocialsModal name={name} socials={socials} />
                        &middot; <a href={website}>Website</a>
                        &middot; <a href={`https://github.com/${github_username}`}>GitHub</a>
                    </S.InfoButtonsContainer>
                </S.ContentLeftContainer>
                <S.ContentRightContainer>
                    <S.ToggleButtonsContainer>
                        <S.ToggleButton icon={IoMdEye} onClick={toggleWatchHandler}>
                            {watchedByCurrentUser ? `Unwatch` : `Watch`}
                        </S.ToggleButton>
                        <S.CountContainer>{watchers.length}</S.CountContainer>
                        <S.ToggleButton
                            icon={starredByCurrentUser ? IoMdStar : IoMdStarOutline}
                            onClick={toggleStarHandler}>
                            {starredByCurrentUser ? `Unstar` : `Star`}
                        </S.ToggleButton>
                        <S.CountContainer>{stars.length}</S.CountContainer>
                    </S.ToggleButtonsContainer>
                    <S.SkillsContainer>
                        {skills.map(skill => (
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
