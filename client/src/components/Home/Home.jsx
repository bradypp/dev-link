import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { signIn } from 'redux/auth';
import Image from 'react-image';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIsAuthenticated, selectUserUsername } from 'redux/auth';
import { setAlert } from 'redux/alerts';
import { Main } from 'shared/components';
import { toastTypes } from 'shared/constants';
import landing from 'assets/img/home/landing.jpg';
import * as S from './HomeStyles';

const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    username: PropTypes.string,
};

const defaultProps = {
    username: undefined,
};
const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    username: selectUserUsername,
});

const Home = ({ isAuthenticated, username, signIn, setAlert }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(setIsMounted(true), 500);
    }, []);

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
            <S.BackgroundImageContainer>
                <S.BackgroundImage />
            </S.BackgroundImageContainer>
            <Main>
                <S.LandingContent>
                    <S.ContentLeft isMounted={isMounted}>
                        <h1>Welcome to our developer community</h1>
                        <p>
                            DevLink is the perfect place to network with like-minded developers and
                            take your career in development to the next level.
                        </p>
                        <S.ButtonsContainer>
                            <S.StyledLink
                                to="/developers"
                                variant="primary-darken"
                                backgroundColor="cyan"
                                color="white1">
                                Find Developers
                            </S.StyledLink>
                            <S.StyledButton
                                onClick={() => {
                                    signIn({
                                        login: 'guest',
                                        password: 'password123/',
                                    });
                                    setAlert(
                                        'You are now signed in as a guest. You are currently unable to edit this profile or account.',
                                        toastTypes.INFO,
                                        8000,
                                    );
                                }}
                                variant="bordered-inset"
                                color="white1"
                                borderColor="white1"
                                backgroundColor="white1">
                                Sign In As A Guest
                            </S.StyledButton>
                        </S.ButtonsContainer>
                    </S.ContentLeft>
                    <S.LandingImageContainer isMounted={isMounted}>
                        <Image src={landing} alt="developers" />
                    </S.LandingImageContainer>
                </S.LandingContent>
                <S.PopularSearchesContainer isMounted={isMounted}>
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

export default connect(mapStateToProps, { signIn, setAlert })(Home);
