import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Image from 'react-image';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIsAuthenticated } from 'redux/auth';
import { Main, CustomLink } from 'shared/components';
import * as S from './HomeStyles';

const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

const Home = ({ isAuthenticated }) => {
    // if (isAuthenticated) return <Redirect to="/developers" />;
    return (
        <Main>
            <S.LandingContent>
                <h1>Welcome to your new developer community</h1>
                <p>
                    DevLink is the perfect place to network with like-minded developers and take
                    your career in development to the next level
                </p>
                <S.StyledLink
                    to="/developers"
                    variant="primary-darken"
                    backgroundColor="primary"
                    color="white1">
                    Find Developers
                </S.StyledLink>
            </S.LandingContent>
            <S.LandingImageContainer>
                <Image
                    src="http://localhost:3000/img/home/landing.jpg"
                    alt="developers sit around a table"
                />
            </S.LandingImageContainer>
        </Main>
    );
};

Home.propTypes = propTypes;

export default connect(mapStateToProps)(Home);
