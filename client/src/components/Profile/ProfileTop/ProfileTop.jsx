import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    getProfileByUsername,
    selectIsProfileLoading,
    selectProfileAvatar,
    selectProfileCoverImage,
    selectProfileInfo,
    selectProfileUser,
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
    TopSubHeading,
} from './ProfileTopStyles';

const propTypes = {
    avatar: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    isProfileLoading: PropTypes.bool.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileUser: PropTypes.object.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    avatar: selectProfileAvatar,
    coverImage: selectProfileCoverImage,
    isProfileLoading: selectIsProfileLoading,
    profileInfo: selectProfileInfo,
    profileUser: selectProfileUser,
});

const mapDispatchToProps = {
    getProfileByUsername,
};

const ProfileTop = ({
    getProfileByUsername,
    avatar,
    coverImage,
    profileInfo,
    profileUser,
    isProfileLoading,
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

    const companySubHeading = company ? (
        <TopSubHeading>
            {company}
            {current_position && <> &middot; {current_position}</>}
        </TopSubHeading>
    ) : (
        <>{current_position && <TopSubHeading>{current_position}</TopSubHeading>}</>
    );

    return (
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
                {companySubHeading}
                <div>
                    {/* watch button & like button */}
                    {/* website link*/}
                    {/* gihub username link*/}
                    {/* Contact info button & socials button*/}
                </div>
            </TopCardContentContainer>
        </TopCardContainer>
    );
};

ProfileTop.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTop);
