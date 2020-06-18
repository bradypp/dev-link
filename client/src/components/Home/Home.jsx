import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Image from 'react-image';
import Media from 'react-media';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIsAuthenticated, selectUserUsername } from 'redux/auth';
import { SignUp } from 'components';
import { Main, Modal } from 'shared/components';
import logo from 'assets/img/home/landing.jpg';
import * as S from './HomeStyles';

const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string,
};

const defaultProps = {
    username: undefined,
};
const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    username: selectUserUsername,
});

const Home = ({ isAuthenticated, username }) => {
    if (isAuthenticated) return <Redirect to={username ? `/profile/${username}` : '/profile'} />;

    const popularSearches = [
        'JavaScript',
        'CSS',
        'React',
        'Node.js',
        'SQL',
        'MongoDB',
        'Bootstrap',
        'C#',
        'PHP',
        'WordPress',
        'Docker',
        'Git',
        'Python',
        'Laravel',
    ];

    return (
        <>
            <Helmet>
                <title>Welcome to DevLink</title>
            </Helmet>
            <Main>
                <S.LandingContent>
                    <S.ContentLeft>
                        <h1>Welcome to our developer community</h1>
                        <p>
                            DevLink is the perfect place to network with like-minded developers and
                            take your career in development to the next level
                        </p>
                        <Media
                            query="(max-width: 800px)"
                            render={() => (
                                <>
                                    <S.LandingImageContainer>
                                        <Image src={logo} alt="developers" />
                                    </S.LandingImageContainer>
                                </>
                            )}
                        />
                        <S.ButtonsContainer>
                            <S.StyledLink
                                to="/developers"
                                variant="primary-darken"
                                backgroundColor="primary"
                                color="white1">
                                Find Developers
                            </S.StyledLink>
                            <Modal
                                renderLink={({ open }) => (
                                    <S.StyledButton
                                        onClick={open}
                                        variant="bordered-fill"
                                        color="primaryDarker"
                                        borderColor="primaryDarker"
                                        backgroundColor="primary">
                                        Create a profile
                                    </S.StyledButton>
                                )}
                                renderContent={({ close }) => (
                                    <SignUp onSubmit={close} onCancel={close} />
                                )}
                            />
                        </S.ButtonsContainer>
                    </S.ContentLeft>
                    <Media
                        query="(min-width: 801px)"
                        render={() => (
                            <>
                                <S.LandingImageContainer>
                                    <Image src={logo} alt="developers" />
                                </S.LandingImageContainer>
                            </>
                        )}
                    />
                </S.LandingContent>
                <S.PopularSearchesContainer>
                    <h2>Popular Searches</h2>
                    {popularSearches.map(skill => (
                        <S.PopularSearchesTag to={`/developers?sk=${skill}`} key={uuidv4()}>
                            {skill}
                        </S.PopularSearchesTag>
                    ))}
                </S.PopularSearchesContainer>
            </Main>
        </>
    );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default connect(mapStateToProps)(Home);
