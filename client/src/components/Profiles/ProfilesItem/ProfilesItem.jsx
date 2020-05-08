import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { CustomLink } from 'shared/components';
import * as S from './ProfilesItemStyles';

const propTypes = {
    profile: PropTypes.object.isRequired,
};

const defaultProps = {};

const ProfilesItem = ({ profile }) => {
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
        username,
    } = profile;
    return (
        <S.ProfilesItemContainer>
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
            <div>
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
                {skills.map(skill => (
                    <CustomLink to="#" key={uuidv4()}>
                        {skill}
                    </CustomLink>
                ))}
            </div>
        </S.ProfilesItemContainer>
    );
};

ProfilesItem.propTypes = propTypes;
ProfilesItem.defaultProps = defaultProps;

export default ProfilesItem;
