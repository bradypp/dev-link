import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
// import Image from 'react-image';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfilePortfolio } from 'redux/profile';
import { CustomLink } from 'shared/components';
import * as S from './ProfilePortfolioStyles';

const propTypes = {
    portfolio: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    portfolio: selectProfilePortfolio,
});

// TODO: Conditional appearance based on if profile belongs to current authenticated user
// TODO: Add loader?
// TODO: make possible/ add prompt to add to portfolio if it doesn't already exist and is current authenticated users profile (including clickable image square)
// TODO: convert skills into tag link that can be clicked and taken to profiles search page filtered for that skill
// TODO: decide on carousel component and have each be clickable to expand for a bigger image in a modal
// TODO: decide on layout (images above or below?)
// TODO: make sure external links work properly (normalize links?)
const ProfilePortfolio = ({ portfolio }) => {
    return (
        <ProfileCard heading="Portfolio">
            {portfolio.map(item => {
                const { title, description, repo, skills, demo } = item;
                return (
                    <ProfileCard.Item key={uuidv4()}>
                        <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                        {description && <p>{description}</p>}
                        <S.SkillsContainer>
                            {skills.length > 0 &&
                                skills.map(skill => (
                                    <CustomLink to="#" key={uuidv4()}>
                                        {skill}
                                    </CustomLink>
                                ))}
                        </S.SkillsContainer>
                        {/* {images.length > 0 &&
                                images.map(image => {
                                    return (
                                        <Image
                                            src={`http://localhost:5000/img/profile/portfolio/${image.small}`}
                                            alt="Portfolio image"
                                            key={uuidv4()}
                                        />
                                    );
                                })} */}
                        <S.LinksContainer>
                            {repo && <a href={repo}>Repo</a>}
                            {demo && <a href={demo}>Demo</a>}
                        </S.LinksContainer>
                    </ProfileCard.Item>
                );
            })}
        </ProfileCard>
    );
};

ProfilePortfolio.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePortfolio);
