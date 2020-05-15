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
            <S.AvatarContainer>
                <S.Avatar
                    className="avatar"
                    src={[
                        `http://localhost:5000/img/profile/avatar/${avatar.small}`,
                        `http://localhost:3000/img/profile/avatar/default-small.jpeg`,
                    ]}
                    alt="Profile avatar"
                />
            </S.AvatarContainer>
            <S.ContentLeft>
                <h2>{name}</h2>
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
                <S.WatchersStarsContainer>
                    <S.WatchersStars>
                        <IoMdEye /> {watchers.length}
                    </S.WatchersStars>
                    <S.WatchersStars>
                        <IoMdStarOutline /> {stars.length}
                    </S.WatchersStars>
                </S.WatchersStarsContainer>
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
        </S.ProfilesItemContainer>
    );
};

ProfilesItem.propTypes = propTypes;
ProfilesItem.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesItem);
