import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { IoMdEye, IoMdStarOutline } from 'react-icons/io';
import { createStructuredSelector } from 'reselect';
import Image from 'react-image';
import {
    selectProfileAvatar,
    selectProfileCoverImage,
    selectProfileInfo,
    selectProfileStars,
    selectProfileWatchers,
    selectProfileContact,
    selectProfileSocials,
    selectProfileSkills,
    toggleStar,
    toggleWatch,
    selectIsCurrentUser,
} from 'redux/profile';
import { selectUser, selectIsAuthenticated } from 'redux/auth';
import { setAlert } from 'redux/alerts';
import { ContactModal } from 'components';
import CoverImageForm from './CoverImageForm/CoverImageForm';
import AvatarForm from './AvatarForm/AvatarForm';
import ProfileTopForm from './ProfileTopForm/ProfileTopForm';
import * as S from './ProfileTopStyles';

const propTypes = {
    toggleStar: PropTypes.func.isRequired,
    toggleWatch: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    avatar: PropTypes.object.isRequired,
    cover_image: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    profileInfo: PropTypes.object.isRequired,
    stars: PropTypes.array.isRequired,
    watchers: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    contact: PropTypes.array.isRequired,
    socials: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    avatar: selectProfileAvatar,
    cover_image: selectProfileCoverImage,
    currentUser: selectUser,
    profileInfo: selectProfileInfo,
    stars: selectProfileStars,
    watchers: selectProfileWatchers,
    isAuthenticated: selectIsAuthenticated,
    contact: selectProfileContact,
    socials: selectProfileSocials,
    skills: selectProfileSkills,
    isCurrentUser: selectIsCurrentUser,
});

const mapDispatchToProps = {
    toggleStar,
    toggleWatch,
    setAlert,
};

// TODO: add available for hire toggle?
// TODO: have clickable placeholders/edit prompts for top section instead of nothing at all
// TODO: add view profile as user button
// TODO: save name from user to profile on sign up/after initial profile creation
const ProfileTop = ({
    avatar,
    cover_image,
    currentUser,
    profileInfo,
    stars,
    watchers,
    toggleStar,
    toggleWatch,
    isAuthenticated,
    setAlert,
    socials,
    contact,
    skills,
    isCurrentUser,
}) => {
    const { headline, current_position, city, country, company, name } = profileInfo;

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
    // TODO: edit coverImage/avatar modals on click if current user
    return (
        <S.ProfileTopCard>
            <S.CoverImageContainer>
                <S.CoverImageUploadContainer>
                    <CoverImageForm />
                </S.CoverImageUploadContainer>
                <Image
                    src={[
                        `http://localhost:5000/img/profile/cover_image/${cover_image.medium}`,
                        ` http://localhost:5000/img/profile/cover_image/default-medium.jpg`,
                    ]}
                    alt="Profile cover"
                />
            </S.CoverImageContainer>
            <S.ContentContainer>
                <S.ContentLeftContainer>
                    <S.AvatarContainer>
                        <S.AvatarUploadContainer>
                            <AvatarForm />
                        </S.AvatarUploadContainer>
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
                            {current_position && <> &middot; {current_position}</>}
                        </h3>
                    ) : (
                        <>{current_position && <h3>{current_position}</h3>}</>
                    )}
                    {(!isEmpty(contact) || !isEmpty(socials)) && (
                        <S.InfoButtonsContainer>
                            {(!isEmpty(contact) || !isEmpty(socials)) && (
                                <ContactModal
                                    contact={contact}
                                    socials={socials}
                                    isCurrentUser={isCurrentUser}
                                />
                            )}
                        </S.InfoButtonsContainer>
                    )}
                </S.ContentLeftContainer>
                <S.ContentRightContainer>
                    <S.ToggleButtonsContainer>
                        <S.ToggleButton icon={<IoMdEye />} onClick={toggleWatchHandler}>
                            {watchedByCurrentUser ? `Unwatch` : `Watch`}
                        </S.ToggleButton>
                        <S.CountContainer>{watchers.length}</S.CountContainer>
                        <S.ToggleButton icon={<IoMdStarOutline />} onClick={toggleStarHandler}>
                            {starredByCurrentUser ? `Unstar` : `Star`}
                        </S.ToggleButton>
                        <S.CountContainer>{stars.length}</S.CountContainer>
                        {/* TODO: add button margin-left */}
                        {isCurrentUser && (
                            <ProfileTopForm
                                currentUser={currentUser}
                                formData={{
                                    name,
                                    headline,
                                    city,
                                    country,
                                    company,
                                    current_position,
                                    socials,
                                    contact,
                                    skills,
                                }}
                            />
                        )}
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
