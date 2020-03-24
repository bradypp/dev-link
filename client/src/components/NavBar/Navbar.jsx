import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthLoading, selectIsAuthenticated, signOut } from 'redux/auth';
import { StyledNav, Logo, StyledLink, StyledButton } from './NavBarStyles';

const propTypes = {
    signOut: PropTypes.func.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const Navbar = ({ isAuthLoading, isAuthenticated, signOut }) => {
    const authLinks = (
        <ul>
            <li>
                <StyledLink to="/profiles">Developers</StyledLink>
            </li>
            <li>
                <StyledLink to="/dashboard">Dashboard</StyledLink>
            </li>
            <li>
                <StyledButton onClick={signOut}>Sign Out</StyledButton>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <StyledLink variant="bordered" to="/sign-in">
                    Sign In
                </StyledLink>
            </li>
            <li>
                <StyledLink to="/sign-up">Join Now</StyledLink>
            </li>
            <li>Options Dropdown</li>
        </ul>
    );

    return (
        <StyledNav className="navbar bg-dark">
            <Logo variant="base" to="/">
                <strong>Dev</strong>Link
            </Logo>
            {!isAuthLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </StyledNav>
    );
};

const mapStateToProps = createStructuredSelector({
    isAuthLoading: selectIsAuthLoading,
    isAuthenticated: selectIsAuthenticated,
});

Navbar.propTypes = propTypes;

export default connect(mapStateToProps, { signOut })(Navbar);
