import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from 'redux/alerts/actions';
import api from 'utils/api';

const Register = ({ setAlert }) => {
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
            try {
                const body = JSON.stringify({
                    name,
                    email,
                    password,
                    password2,
                });

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const res = await api.post('auth/register', body, config);
                console.log(res.data);
            } catch (err) {
                console.log(err.response.data);
            }
        }
    };

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user" /> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
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

export default connect(null, { setAlert })(Register);
