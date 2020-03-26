import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading, selectIsAuthenticated, signOut } from 'redux/auth';
import {
    StyledHeader,
    StyledNav,
    Logo,
    StyledPrimaryLink,
    StyledPrimaryButton,
    StyledBorderedLink,
} from './HeaderStyles';

const propTypes = {
    signOut: PropTypes.func.isRequired,
    isUserLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const Header = ({ isUserLoading, isAuthenticated, signOut }) => {
    const signedInMenu = (
        <>
            <StyledPrimaryLink to="/profiles">Developers</StyledPrimaryLink>
            <StyledPrimaryLink to="/dashboard">Dashboard</StyledPrimaryLink>
            <StyledPrimaryButton onClick={signOut}>Sign Out</StyledPrimaryButton>
        </>
    );

    const guestMenu = (
        <>
            <StyledBorderedLink to="/sign-in">Sign In</StyledBorderedLink>
            <StyledPrimaryButton color="primaryDark" to="/sign-up">
                Join Now
            </StyledPrimaryButton>
        </>
    );

    return (
        <StyledHeader>
            <StyledNav>
                <Logo to="/">
                    <strong>Dev</strong>Link
                </Logo>
                {!isUserLoading && isAuthenticated ? signedInMenu : guestMenu}
            </StyledNav>
        </StyledHeader>
    );
};

const mapStateToProps = createStructuredSelector({
    isUserLoading: selectIsUserLoading,
    isAuthenticated: selectIsAuthenticated,
});

Header.propTypes = propTypes;

export default connect(mapStateToProps, { signOut })(Header);
