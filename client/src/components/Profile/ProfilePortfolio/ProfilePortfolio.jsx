import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-image';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProfileCard } from 'components';
import { selectProfilePortfolio, selectIsCurrentUser } from 'redux/profile';
import { CustomLink, OutboundLink, Flex } from 'shared/components';
import ProfilePortfolioForm from './ProfilePortfolioForm/ProfilePortfolioForm';
import * as S from './ProfilePortfolioStyles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const propTypes = {
    portfolio: PropTypes.array.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    portfolio: selectProfilePortfolio,
    isCurrentUser: selectIsCurrentUser,
});

const ProfilePortfolio = ({ portfolio, isCurrentUser }) => {
    return (
        <ProfileCard heading="Portfolio" buttons={() => <ProfilePortfolioForm withAdd />}>
            {portfolio.map(item => {
                const { title, description, repo, images, skills, demo } = item;
                // TODO: lazy load carousel
                return (
                    <ProfileCard.Item key={uuidv4()}>
                        <Flex justifyContent="space-between">
                            <ProfileCard.Item.Heading>{title}</ProfileCard.Item.Heading>
                            {isCurrentUser && <ProfilePortfolioForm formData={item} />}
                        </Flex>
                        <Flex>
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
                                        {images.map((image, i) => (
                                            <Image
                                                src={`http://localhost:5000/img/profile/portfolio/${image.small}`}
                                                alt={`Portfolio item - ${title} - ${i + 1}`}
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
