import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { loginUser } from 'redux/auth';
import { selectAlerts } from 'redux/alerts';

const Login = ({ loginUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(formData);
    };

    const onSubmit = async event => {
        event.preventDefault();
        loginUser(formData);
    };

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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    );
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    alerts: selectAlerts,
});

export default connect(mapStateToProps, { loginUser })(Login);
