import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { IoMdEye, IoMdStarOutline } from 'react-icons/io';
import { Tag } from 'shared/components';
import { toggleStar, toggleWatch } from 'redux/profile';
import { selectIsAuthenticated, selectUser } from 'redux/auth';
import defaultAvatar from 'assets/img/profile/avatar/default-thumbnail.jpeg';
import * as S from './ProfilesItemStyles';

const propTypes = {
    profile: PropTypes.object.isRequired,
};

const defaultProps = {};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    currentUser: selectUser,
});

const mapDispatchToProps = {
    toggleWatch,
    toggleStar,
};

const ProfilesItem = ({ profile }) => {
    const history = useHistory();
    const {
        avatar,
        headline,
        current_position,
        city,
        country,
        company,
        name,
        skills,
        stars,
        watchers,
        user,
    } = profile;

    return (
        <S.ProfilesItemContainer
            onClick={() => {
                history.push(`/profile/${user.username}`);
            }}>
            <S.ItemContainer>
                <S.AvatarContainer>
                    <S.Avatar
                        className="avatar"
                        src={[avatar, defaultAvatar]}
                        alt="Profile avatar"
                    />
                </S.AvatarContainer>
                <S.ContentContainer>
                    <S.NameRow>
                        <h2>{name}</h2>
                        <S.WatchersStarsContainer>
                            <S.WatchersStars>
                                <IoMdEye /> {watchers.length}
                            </S.WatchersStars>
                            <S.WatchersStars>
                                <IoMdStarOutline /> {stars.length}
                            </S.WatchersStars>
                        </S.WatchersStarsContainer>
                    </S.NameRow>
                    <S.SubContentContainer>
                        <S.ContentLeft>
                            {headline && <h3>{headline}</h3>}
                            {company ? (
                                <p>
                                    {company}
                                    {current_position && <> &middot; {current_position}</>}
                                </p>
                            ) : (
                                <>{current_position && <p>{current_position}</p>}</>
                            )}
                            {city ? (
                                <p>
                                    {city}
                                    {country && <>, {country}</>}
                                </p>
                            ) : (
                                <>{country && <p>{country}</p>}</>
                            )}
                        </S.ContentLeft>
                        <S.ContentRight>
                            <S.SkillsContainer>
                                {skills.map(skill => (
                                    <Tag
                                        as="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            history.push(`/profile/${user.username}`);
                                        }}
                                        key={uuidv4()}>
                                        {skill}
                                    </Tag>
                                ))}
                            </S.SkillsContainer>
                        </S.ContentRight>
                    </S.SubContentContainer>
                </S.ContentContainer>
            </S.ItemContainer>
        </S.ProfilesItemContainer>
    );
};

ProfilesItem.propTypes = propTypes;
ProfilesItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesItem);
