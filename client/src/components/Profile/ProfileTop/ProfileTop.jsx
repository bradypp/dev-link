import React from 'react';
import PropTypes from 'prop-types';
import { IoMdEye, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ExternalLink, Button, CustomLink } from 'shared/components';
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
import { ProfileTopStyles } from './ProfileTopStyles';

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
        <ProfileTopStyles>
            <div className="cover-image-container">
                <Image
                    className="cover-image"
                    src={[
                        `http://localhost:5000/img/profile/cover_image/${coverImage}`,
                        ` http://localhost:5000/img/profile/cover_image/default.jpg`,
                    ]}
                    alt="Profile cover"
                />
            </div>
            <div className="content">
                <div className="content-left">
                    <div className="avatar-container">
                        <Image
                            className="avatar"
                            src={[
                                `http://localhost:5000/img/profile/avatar/${avatar}`,
                                `http://localhost:5000/img/profile/avatar/default.jpg`,
                            ]}
                            alt="Profile avatar"
                        />
                    </div>
                    <h1 className="name">{name}</h1>
                    {headline && <h2 className="headline">{headline}</h2>}
                    {city ? (
                        <h3 className="subheading">
                            {city}
                            {country && <>, {country}</>}
                        </h3>
                    ) : (
                        <>{country && <h3 className="subheading">{country}</h3>}</>
                    )}
                    {company ? (
                        <h3 className="subheading">
                            {company}
                            {current_position && <> &middot; {current_position}</>}
                        </h3>
                    ) : (
                        <>
                            {current_position && <h3 className="subheading">{current_position}</h3>}
                        </>
                    )}
                    <div className="info-buttons">
                        <Contact name={name} profileContact={profileContact} /> &middot;
                        <Socials name={name} profileSocials={profileSocials} />
                        &middot; <ExternalLink href={website}>Website</ExternalLink>
                        &middot;{' '}
                        <ExternalLink href={`https://github.com/${github_username}`}>
                            GitHub
                        </ExternalLink>
                    </div>
                </div>
                <div className="content-right">
                    <div className="toggle-buttons">
                        <Button
                            className="toggle-button"
                            icon={IoMdEye}
                            onClick={toggleWatchHandler}>
                            {watchedByCurrentUser ? `Unwatch` : `Watch`}
                        </Button>
                        <div className="count-container">{profileWatchers.length}</div>
                        <Button
                            className="toggle-button"
                            icon={starredByCurrentUser ? IoMdStar : IoMdStarOutline}
                            onClick={toggleStarHandler}>
                            {starredByCurrentUser ? `Unstar` : `Star`}
                        </Button>
                        <div className="count-container">{profileStars.length}</div>
                    </div>
                    <div className="skills">
                        {profileSkills.map(skill => (
                            <CustomLink className="skill" to="#" key={uuidv4()}>
                                {skill}
                            </CustomLink>
                        ))}
                    </div>
                </div>
            </div>
        </ProfileTopStyles>
    );
};

ProfileTop.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTop);
