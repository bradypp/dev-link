import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading, selectIsAuthenticated, signOut } from 'redux/auth';
import { Section } from 'shared/components';
import { StyledNav, Logo, PrimaryLink, PrimaryButton, SecondaryLink } from './NavBarStyles';

const propTypes = {
    signOut: PropTypes.func.isRequired,
    isUserLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const Navbar = ({ isUserLoading, isAuthenticated, signOut }) => {
    const signedInMenu = (
        <>
            <PrimaryLink to="/profiles">Developers</PrimaryLink>
            <PrimaryLink to="/dashboard">Dashboard</PrimaryLink>
            <PrimaryButton onClick={signOut}>Sign Out</PrimaryButton>
        </>
    );

    const guestMenu = (
        <>
            <SecondaryLink to="/sign-in">Sign In</SecondaryLink>
            <PrimaryLink to="/sign-up">Join Now</PrimaryLink>
        </>
    );

    return (
        <StyledNav>
            <Logo to="/">
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
