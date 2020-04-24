import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Button, CustomLink } from 'shared/components';
import { selectIsUserLoading, selectIsAuthenticated, signOut, selectUser } from 'redux/auth';
import * as S from './HeaderStyles';

const propTypes = {
    signOut: PropTypes.func.isRequired,
    isUserLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

const stateToProps = {
    isUserLoading: selectIsUserLoading,
    user: selectUser,
    isAuthenticated: selectIsAuthenticated,
};

// TODO: Edit content of header in different states when finished (for now include what you need to build the app & test)
// TODO: Edit styling
const Header = ({ isUserLoading, isAuthenticated, signOut, user }) => {
    const location = useLocation();

    const signedInMenu = (
        <>
            <CustomLink to="/search">Developers</CustomLink>
            <CustomLink to={`/profile/${user.username}`}>Profile</CustomLink>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
            <Button onClick={signOut}>Sign Out</Button>
        </>
    );

    const guestMenu = (
        <>
            <CustomLink to="/sign-in">Sign In</CustomLink>
            <CustomLink to="/sign-up">Join Now</CustomLink>
        </>
    );

    // TODO: Add search bar with location
    return (
        <S.HeaderContainer>
            <S.NavContainer>
                <S.Logo to="/">
                    <strong>Dev</strong>Link
                </S.Logo>
                {location.pathname !== '/' && `Search Bar Here!`}
                {isAuthenticated ? signedInMenu : guestMenu}
            </S.NavContainer>
        </S.HeaderContainer>
    );
};

Header.propTypes = propTypes;

const mapStateToProps = createStructuredSelector(stateToProps);

export default connect(mapStateToProps, { signOut })(Header);
