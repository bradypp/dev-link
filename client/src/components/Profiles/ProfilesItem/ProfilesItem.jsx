import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { CustomLink, Tag } from 'shared/components';
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
        user,
    } = profile;
    const history = useHistory();

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
            </div>
            <div>
                {/* TODO: customize skills tags */}
                {skills.map(skill => (
                    <Tag to="#" key={uuidv4()}>
                        {skill}
                    </Tag>
                ))}
            </div>
            {/* TODO: add toggle buttons/counters */}
            <div>stars</div>
            <div>watchers</div>
        </S.ProfilesItemContainer>
    );
};

ProfilesItem.propTypes = propTypes;
ProfilesItem.defaultProps = defaultProps;

export default ProfilesItem;
