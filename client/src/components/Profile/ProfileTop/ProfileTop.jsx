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
import { ToggleButton } from 'shared/components';
import { ContactModal } from 'components';
import { toastTypes } from 'shared/constants';
import defaultCoverImage from 'assets/img/profile/cover-image/default-medium.jpeg';
import defaultAvatar from 'assets/img/profile/avatar/default-small.jpeg';
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
            setAlert('You must be signed in to watch a profile!', toastTypes.INFO);
        }
    };
    const toggleStarHandler = () => {
        if (isAuthenticated) {
            toggleStar(profileInfo._id);
        } else {
            setAlert('You must be signed in to star a profile!', toastTypes.INFO);
        }
    };

    const starredByCurrentUser = stars.includes(currentUser._id);
    const watchedByCurrentUser = watchers.includes(currentUser._id);

    return (
        <S.ProfileTopCard>
            <S.CoverImageContainer isCurrentUser={isCurrentUser}>
                {isCurrentUser && (
                    <S.CoverImageUploadContainer>
                        <CoverImageForm />
                    </S.CoverImageUploadContainer>
                )}
                <Image src={[cover_image, defaultCoverImage]} alt="Profile cover" />
            </S.CoverImageContainer>
            <S.ContentTopContainer>
                <S.AvatarContainer>
                    {isCurrentUser && (
                        <S.AvatarUploadContainer>
                            <AvatarForm />
                        </S.AvatarUploadContainer>
                    )}
                    <S.Avatar
                        className="avatar"
                        src={[avatar, defaultAvatar]}
                        alt="Profile avatar"
                    />
                </S.AvatarContainer>
                <S.ToggleButtonsContainer>
                    <ToggleButton
                        buttonText={watchedByCurrentUser ? `Unwatch` : `Watch`}
                        icon={<IoMdEye />}
                        onClick={toggleWatchHandler}
                        count={watchers.length}
                    />
                    <ToggleButton
                        buttonText={starredByCurrentUser ? `Unstar` : `Star`}
                        icon={<IoMdStarOutline />}
                        onClick={toggleStarHandler}
                        count={stars.length}
                    />
                    {isCurrentUser && (
                        <ProfileTopForm
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
            </S.ContentTopContainer>
            <S.ContentContainer>
                <S.ContentLeftContainer>
                    <h1>{name}</h1>
                    {headline && <h2>{headline}</h2>}
                    {company ? (
                        <h3>
                            {company}
                            {current_position && <> &middot; {current_position}</>}
                        </h3>
                    ) : (
                        <>{current_position && <h3>{current_position}</h3>}</>
                    )}
                    {city ? (
                        <h3>
                            {city}
                            {country && <>, {country}</>}
                        </h3>
                    ) : (
                        <>{country && <h3>{country}</h3>}</>
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
                    <S.SkillsContainer>
                        {skills.map(skill => (
                            <S.SkillLink
                                to={`/developers?sk=${skill.toLowerCase()}`}
                                key={uuidv4()}>
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
