import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setAlert, clearAlerts, selectAlerts } from 'redux/alerts';
import { signUp, selectIsAuthenticated } from 'redux/auth';

const SignUp = ({ setAlert, clearAlerts, signUp, isAuthenticated, alerts }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const { name, email, password, password2 } = formData;

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onSubmit = async event => {
        event.preventDefault();

        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            signUp(formData);
        }
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
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">Create Your Account</p>
            <form className="form" onSubmit={onSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="8"
                        value={password2}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Sign Up" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/sign-in">Sign In</Link>
            </p>
        </>
    );
};

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    clearAlerts: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
    alerts: selectAlerts,
});

export default connect(mapStateToProps, { setAlert, signUp, clearAlerts })(SignUp);
