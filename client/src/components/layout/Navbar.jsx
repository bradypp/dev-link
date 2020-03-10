import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading, selectIsAuthenticated, logoutUser } from 'redux/auth';

const Navbar = ({ isLoading, isAuthenticated, logoutUser }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/profile/dashboard">
                    <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logoutUser} href="#!">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
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
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
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
            {!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </nav>
    );
};

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading,
    isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
