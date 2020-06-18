import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { selectProfileSkills, selectProfilePortfolio, selectProfileId } from 'redux/profile';
import { selectRecommendedProfiles, getRecommendedProfiles } from 'redux/profiles';
import defaultAvatar from 'assets/img/profile/avatar/default-thumbnail.jpeg';
import * as S from './RecommendedProfilesStyles';

const propTypes = {
    getRecommendedProfiles: PropTypes.func.isRequired,
    recommendedProfiles: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    portfolio: PropTypes.array.isRequired,
    profileId: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
    recommendedProfiles: selectRecommendedProfiles,
    skills: selectProfileSkills,
    portfolio: selectProfilePortfolio,
    profileId: selectProfileId,
});

const mapDispatchToProps = {
    getRecommendedProfiles,
};

const RecommendedProfiles = ({
    recommendedProfiles,
    getRecommendedProfiles,
    skills,
    portfolio,
    profileId,
}) => {
    const history = useHistory();

    const portfolioSkills = new Set(portfolio.map(item => item.skills).flat());
    const filteredProfiles = recommendedProfiles.filter(el => el._id !== profileId);

    useEffect(() => {
        getRecommendedProfiles({
            [`skills[inregex]`]: [...skills, ...Array.from(portfolioSkills)],
            sort: '-total_stars',
            limit: 10,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        filteredProfiles.length > 0 && (
            <S.RecommendedProfilesContainer>
                <h2>Recommended Profiles</h2>
                {filteredProfiles.map(profile => {
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
                                    src={[avatar, defaultAvatar]}
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
        )
    );
};

RecommendedProfiles.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedProfiles);
