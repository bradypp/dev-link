import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from 'redux/alerts/actions';
import { registerUser } from 'redux/auth/actions';

const Register = ({ setAlert, registerUser }) => {
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
            registerUser({ name, email, password, password2 });
        }
    };

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user" /> Create Your Account
            </p>
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
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, registerUser })(Register);
