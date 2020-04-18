import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Flex, A } from 'shared/components';
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
import { ProfileCard } from '../ProfileStyles';
import Contact from './Contact/Contact';
import Socials from './Socials/Socials';
import {
    ContentContainer,
    CoverImage,
    CoverImageContainer,
    AvatarContainer,
    Avatar,
    Name,
    Headline,
    TopSubHeading,
    ToggleButton,
    StarIcon,
    WatchIcon,
    CountContainer,
    ButtonsContainer,
    StarredIcon,
    ContentRightContainer,
    ContactSocialContainer,
    SkillsLink,
} from './ProfileTopStyles';

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
        <ProfileCard padding="0">
            <CoverImageContainer>
                <CoverImage
                    src={[
                        `http://localhost:5000/img/profile/cover_image/${coverImage}`,
                        ` http://localhost:5000/img/profile/cover_image/default.jpg`,
                    ]}
                    alt="Profile cover"
                />
            </CoverImageContainer>
            <ContentContainer>
                <Flex flexDirection="column" alignItems="flexStart">
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
                    {headline && <Headline>{headline}</Headline>}
                    {city ? (
                        <TopSubHeading>
                            {city}
                            {country && <>, {country}</>}
                        </TopSubHeading>
                    ) : (
                        <>{country && <TopSubHeading>{country}</TopSubHeading>}</>
                    )}
                    {company ? (
                        <TopSubHeading>
                            {company}
                            {current_position && <> &middot; {current_position}</>}
                        </TopSubHeading>
                    ) : (
                        <>{current_position && <TopSubHeading>{current_position}</TopSubHeading>}</>
                    )}
                    <ContactSocialContainer>
                        <Contact name={name} profileContact={profileContact} /> &middot;
                        <Socials name={name} profileSocials={profileSocials} />
                        &middot; <A href={website}>Website</A>
                        &middot; <A href={`https://github.com/${github_username}`}>GitHub</A>
                    </ContactSocialContainer>
                </Flex>
                <ContentRightContainer>
                    <ButtonsContainer>
                        <ToggleButton Icon={WatchIcon} onClick={toggleWatchHandler}>
                            {watchedByCurrentUser ? `Unwatch` : `Watch`}
                        </ToggleButton>
                        <CountContainer className="count">{profileWatchers.length}</CountContainer>
                        <ToggleButton
                            Icon={starredByCurrentUser ? StarredIcon : StarIcon}
                            onClick={toggleStarHandler}>
                            {starredByCurrentUser ? `Unstar` : `Star`}
                        </ToggleButton>
                        <CountContainer className="count">{profileStars.length}</CountContainer>
                    </ButtonsContainer>
                    <Flex justifyContent="flex-end" alignItems="flex-end">
                        {profileSkills.map(skill => (
                            <SkillsLink to="/" key={uuidv4()}>
                                {skill}
                            </SkillsLink>
                        ))}
                    </Flex>
                </ContentRightContainer>
            </ContentContainer>
        </ProfileCard>
    );
};

ProfileTop.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTop);
