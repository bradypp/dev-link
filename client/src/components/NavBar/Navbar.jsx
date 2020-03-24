import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading, selectIsAuthenticated, signOut } from 'redux/auth';
import { StyledNav, Logo, StyledLink, StyledButton } from './NavBarStyles';

const propTypes = {
    signOut: PropTypes.func.isRequired,
    isUserLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const Navbar = ({ isUserLoading, isAuthenticated, signOut }) => {
    const signedInMenu = (
        <>
            <StyledLink to="/profiles">Developers</StyledLink>
            <StyledLink variant="tertiary" to="/dashboard">
                Dashboard
            </StyledLink>
            <StyledButton onClick={signOut}>Sign Out</StyledButton>
        </>
    );

    const guestMenu = (
        <>
            <StyledLink variant="secondary" to="/sign-in">
                Sign In
            </StyledLink>
            <StyledLink to="/sign-up">Join Now</StyledLink>
        </>
    );

    return (
        <StyledNav className="navbar bg-dark">
            <Logo color="base" to="/">
                <strong>Dev</strong>Link
            </Logo>
            {!isUserLoading && isAuthenticated ? signedInMenu : guestMenu}
        </StyledNav>
    );
};

const mapStateToProps = createStructuredSelector({
    isUserLoading: selectIsUserLoading,
    isAuthenticated: selectIsAuthenticated,
});

Navbar.propTypes = propTypes;

export default connect(mapStateToProps, { signOut })(Navbar);
