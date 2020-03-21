import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/auth';

const Home = ({ isAuthenticated }) => {
    if (isAuthenticated) return <Redirect to="/dashboard" />;
    return (
        <section className="home">
            <div className="dark-overlay">
                <div className="home-inner">
                    <h1 className="x-large">Dev Link</h1>
                    <p className="lead">
                        Create your developer profile, share your project ideas and link-up with
                        like-minded developers
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(Home);
