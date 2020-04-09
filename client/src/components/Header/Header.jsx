import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading, selectIsAuthenticated, signOut, selectUser } from 'redux/auth';
import {
    HeaderContainer,
    NavContainer,
    Logo,
    StyledPrimaryLink,
    StyledPrimaryButton,
    StyledBorderedLink,
} from './HeaderStyles';

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
            <StyledPrimaryLink to="/search">Developers</StyledPrimaryLink>
            <StyledPrimaryLink to={`/profile/${user.username}`}>Profile</StyledPrimaryLink>
            <StyledPrimaryLink to="/dashboard">Dashboard</StyledPrimaryLink>
            <StyledPrimaryButton onClick={signOut}>Sign Out</StyledPrimaryButton>
        </>
    );

    const guestMenu = (
        <>
            <StyledBorderedLink to="/sign-in">Sign In</StyledBorderedLink>
            <StyledPrimaryLink to="/sign-up">Join Now</StyledPrimaryLink>
        </>
    );

    // TODO: Add search bar with location
    return (
        <HeaderContainer>
            <NavContainer>
                <Logo to="/">
                    <strong>Dev</strong>Link
                </Logo>
                {location.pathname !== '/' && `Search Bar Here!`}
                {(isUserLoading && guestMenu) || isAuthenticated ? signedInMenu : guestMenu}
            </NavContainer>
        </HeaderContainer>
    );
};

Header.propTypes = propTypes;

const mapStateToProps = createStructuredSelector(stateToProps);

export default connect(mapStateToProps, { signOut })(Header);
