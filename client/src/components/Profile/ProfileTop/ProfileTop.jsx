import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    selectProfileAvatar,
    selectProfileCoverImage,
    selectProfileInfo,
    selectProfileUser,
    selectProfileStars,
    selectProfileWatchers,
    toggleStar,
    toggleWatch,
} from 'redux/profiles';
import { selectUser, selectIsAuthenticated } from 'redux/auth';
import { setAlert } from 'redux/alerts';
import {
    ProfileTopContainer,
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
    ToggleButtonsContainer,
    StarredIcon,
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
    // TODO: Put stars/watchers buttons in a form wrapper?
    // TODO: Button and numbers styling
    // TODO: add clicking on stars/watchers numbers to take you to a list of all the users in that array, list the users profiles?

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

    return (
        <ProfileTopContainer>
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
                </div>
                <ToggleButtonsContainer>
                    <ToggleButton Icon={() => <WatchIcon />} onClick={toggleWatchHandler}>
                        {watchedByCurrentUser ? 'Watching' : 'Watch'}
                    </ToggleButton>
                    <CountContainer className="count">{profileWatchers.length}</CountContainer>
                    <ToggleButton
                        Icon={() => (starredByCurrentUser ? <StarredIcon /> : <StarIcon />)}
                        onClick={toggleStarHandler}>
                        {starredByCurrentUser ? 'Starred' : 'Star'}
                    </ToggleButton>
                    <CountContainer className="count">{profileStars.length}</CountContainer>
                    {/* watch button & like button */}
                    {/* website link*/}
                    {/* gihub username link*/}
                    {/* Contact info button & socials button*/}
                </ToggleButtonsContainer>
            </ContentContainer>
        </ProfileTopContainer>
    );
};

ProfileTop.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTop);
