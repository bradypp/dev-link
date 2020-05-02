import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-image';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfilePortfolio } from 'redux/profile';
import { CustomLink, OutboundLink, Flex } from 'shared/components';
import * as S from './ProfilePortfolioStyles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

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
                const { title, description, repo, images, skills, demo } = item;
                // TODO: look at lazy loading carousel
                return (
                    <ProfileCard.Item key={uuidv4()}>
                        <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                        <Flex alignItems="flex-start">
                            <S.ContentContainer>
                                {description && <p>{description}</p>}
                                <S.SkillsContainer>
                                    {skills.length > 0 &&
                                        skills.map(skill => (
                                            <CustomLink to="#" key={uuidv4()}>
                                                {skill}
                                            </CustomLink>
                                        ))}
                                </S.SkillsContainer>
                                <S.LinksContainer>
                                    {repo && <OutboundLink href={repo}>Repo</OutboundLink>}
                                    {demo && <OutboundLink href={demo}>Demo</OutboundLink>}
                                </S.LinksContainer>
                            </S.ContentContainer>
                            <S.CarouselContainer>
                                {images.length > 0 && (
                                    <Carousel
                                        infiniteLoop
                                        useKeyboardArrows
                                        autoPlay
                                        stopOnHover
                                        swipeable
                                        emulateTouch
                                        showStatus={false}
                                        showThumbs={false}
                                        interval={5000}>
                                        {images.map(image => (
                                            <Image
                                                src={`http://localhost:5000/img/profile/portfolio/${image.small}`}
                                                alt="Portfolio image"
                                                key={uuidv4()}
                                            />
                                        ))}
                                    </Carousel>
                                )}
                            </S.CarouselContainer>
                        </Flex>
                    </ProfileCard.Item>
                );
            })}
        </ProfileCard>
    );
};

ProfilePortfolio.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePortfolio);
