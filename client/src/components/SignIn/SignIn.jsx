import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signIn, selectIsAuthenticated } from 'redux/profile/auth';
import { clearAlerts, selectAlerts } from 'redux/alerts';

const SignIn = ({ signIn, clearAlerts, isAuthenticated, alerts }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onSubmit = async event => {
        event.preventDefault();
        signIn(formData);
    };

    useEffect(() => {
        if (alerts.length > 0) {
            clearAlerts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form" onSubmit={onSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="8"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Sign In" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
        </>
    );
};

SignIn.propTypes = {
    signIn: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    alerts: selectAlerts,
});

export default connect(mapStateToProps, { signIn, clearAlerts })(SignIn);
