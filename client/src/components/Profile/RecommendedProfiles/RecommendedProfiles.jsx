import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { selectProfileSkills } from 'redux/profile';
import { selectRecommendedProfiles, getRecommendedProfiles } from 'redux/profiles';
import defaultAvatar from 'assets/img/profile/avatar/default-thumbnail.jpeg';
import * as S from './RecommendedProfilesStyles';

const propTypes = {
    getRecommendedProfiles: PropTypes.func.isRequired,
    recommendedProfiles: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    recommendedProfiles: selectRecommendedProfiles,
    skills: selectProfileSkills,
});

const mapDispatchToProps = {
    getRecommendedProfiles,
};

const RecommendedProfiles = ({ recommendedProfiles, getRecommendedProfiles, skills }) => {
    const history = useHistory();

    useEffect(() => {
        getRecommendedProfiles({
            [`skills[inregex]`]: skills,
            sort: '-total_stars',
            limit: 10,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <S.RecommendedProfilesContainer>
            <h2>Recommended Profiles</h2>
            {recommendedProfiles.map(profile => {
                const { avatar, headline, name, user } = profile;

                return (
                    <S.RecommendedProfileContainer
                        key={uuidv4()}
                        onClick={() => {
                            history.push(`/profile/${user.username}`);
                        }}>
                        <S.AvatarContainer>
                            <S.Avatar
                                className="avatar"
                                src={[
                                    `http://localhost:5000/img/profile/avatar/${avatar.thumbnail}`,
                                    defaultAvatar,
                                ]}
                                alt="Profile avatar"
                            />
                        </S.AvatarContainer>
                        <div>
                            <h3>{name}</h3>
                            {headline && <p>{headline}</p>}
                        </div>
                    </S.RecommendedProfileContainer>
                );
            })}
        </S.RecommendedProfilesContainer>
    );
};

RecommendedProfiles.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedProfiles);
