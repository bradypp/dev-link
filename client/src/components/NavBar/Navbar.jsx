import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthLoading, selectIsAuthenticated, signOut } from 'redux/profile/auth';

const Navbar = ({ isAuthLoading, isAuthenticated, signOut }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={signOut} href="#!">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Sign Out</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/sign-up">Sign Up</Link>
            </li>
            <li>
                <Link to="/sign-in">Sign In</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code" /> DevLink
                </Link>
            </h1>
            {!isAuthLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </nav>
    );
};

Navbar.propTypes = {
    signOut: PropTypes.func.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthLoading: selectIsAuthLoading,
    isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps, { signOut })(Navbar);
