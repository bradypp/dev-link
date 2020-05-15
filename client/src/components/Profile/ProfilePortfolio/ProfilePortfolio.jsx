import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-image';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import Media from 'react-media';
import { createStructuredSelector } from 'reselect';
import { selectProfilePortfolio, selectIsCurrentUser } from 'redux/profile';
import { urls } from 'shared/constants';
import { ProfileCard } from 'components';
import { Tag, Flex } from 'shared/components';
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
        <>
            {(portfolio.length > 0 || isCurrentUser) && (
                <ProfileCard
                    heading="Portfolio"
                    buttons={() => isCurrentUser && <ProfilePortfolioForm withAdd />}>
                    {portfolio.map(item => {
                        const { title, description, repo, images, skills, demo } = item;
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
                                                    <Tag
                                                        to={`/developers?sk=${skill.toLowerCase()}`}
                                                        key={uuidv4()}>
                                                        {skill}
                                                    </Tag>
                                                ))}
                                        </S.SkillsContainer>
                                        <Media
                                            query="(max-width: 600px)"
                                            render={() => (
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
                                                                    src={`${urls.server}/img/profile/portfolio/${image.medium}`}
                                                                    alt={`Portfolio item - ${title} - ${i +
                                                                        1}`}
                                                                    key={uuidv4()}
                                                                />
                                                            ))}
                                                        </Carousel>
                                                    )}
                                                </S.CarouselContainer>
                                            )}
                                        />
                                        <S.LinksContainer>
                                            {repo && (
                                                <S.StyledCustomLink
                                                    variant="bordered-inset"
                                                    backgroundColor="primary"
                                                    borderColor="primary"
                                                    color="primary"
                                                    href={repo}>
                                                    Repo
                                                </S.StyledCustomLink>
                                            )}
                                            {demo && (
                                                <S.StyledCustomLink
                                                    variant="bordered-inset"
                                                    backgroundColor="primary"
                                                    borderColor="primary"
                                                    color="primary"
                                                    href={demo}>
                                                    Demo
                                                </S.StyledCustomLink>
                                            )}
                                        </S.LinksContainer>
                                    </S.ContentContainer>
                                    <Media
                                        query="(min-width: 601px)"
                                        render={() => (
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
                                                                src={`${urls.server}/img/profile/portfolio/${image.medium}`}
                                                                alt={`Portfolio item - ${title} - ${i +
                                                                    1}`}
                                                                key={uuidv4()}
                                                            />
                                                        ))}
                                                    </Carousel>
                                                )}
                                            </S.CarouselContainer>
                                        )}
                                    />
                                </Flex>
                            </ProfileCard.Item>
                        );
                    })}
                </ProfileCard>
            )}
        </>
    );
};

ProfilePortfolio.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePortfolio);
