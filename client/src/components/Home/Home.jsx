import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/auth';
import { Section } from 'shared/components';

const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const Home = ({ isAuthenticated }) => {
    if (isAuthenticated) return <Redirect to="/dashboard" />;
    return (
        <Section>
            <h1 className="x-large">Dev Link</h1>
            <p className="lead">
                Create your developer profile, share your project ideas and link-up with like-minded
                developers
            </p>
            <div className="buttons">
                <Link to="/sign-up" className="btn btn-primary">
                    Sign Up
                </Link>
                <Link to="/sign-in" className="btn btn-light">
                    Login
                </Link>
            </div>
        </Section>
    );
};

Home.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(Home);
