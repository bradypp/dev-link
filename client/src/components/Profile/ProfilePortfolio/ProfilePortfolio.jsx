import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-image';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfilePortfolio } from 'redux/profiles';
import { CustomLink } from 'shared/components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as S from './ProfilePortfolioStyles';

const propTypes = {
    portfolio: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    portfolio: selectProfilePortfolio,
});

// TODO: make possible/ add prompt to add to portfolio if it doesn't already exist and is current authenticated users profile (including clickable image square)
// TODO: convert skills into tag link that can be clicked and taken to profiles search page filtered for that skill
// TODO: decide on carousel component and have each be clickable to expand for a bigger image in a modal
// TODO: decide on layout (images above or below?)
const ProfilePortfolio = ({ portfolio }) => {
    return (
        <ProfileCard heading="Portfolio">
            {portfolio.map(item => {
                const { title, description, repo, skills, demo, images } = item;
                return (
                    <S.PortfolioItemContainer>
                        <h3>{title}</h3>
                        <S.PortfolioItemContent>
                            <S.ItemInfoContainer>
                                {description && <p>{description}</p>}
                                <S.SkillsContainer>
                                    {skills.length > 0 &&
                                        skills.map(skill => (
                                            <CustomLink to="#">{skill}</CustomLink>
                                        ))}
                                </S.SkillsContainer>
                                <S.LinksContainer>
                                    {repo && <a href={repo}>Repo</a>}
                                    {demo && <a href={demo}>Demo</a>}
                                </S.LinksContainer>
                            </S.ItemInfoContainer>
                            {/* {images.length > 0 &&
                                images.map(image => {
                                    return (
                                        <Image
                                            src={`http://localhost:5000/img/profile/portfolio/${image.small}`}
                                            alt="Portfolio image"
                                        />
                                    );
                                })} */}
                        </S.PortfolioItemContent>
                    </S.PortfolioItemContainer>
                );
            })}
        </ProfileCard>
    );
};

ProfilePortfolio.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePortfolio);
