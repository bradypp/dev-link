import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from 'redux/alerts';
import { signUp, selectIsAuthenticated } from 'redux/auth';
import { Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';
// import * as S from './SignUpStyles';

const propTypes = {
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

// TODO: add location to sign up?
// TODO: decide on redirect
// TODO: edit styling (look at other websites)
const SignUp = ({ signUp, isAuthenticated }) => {
    const signUpValidation = Yup.object().shape({
        name: validators.name,
        username: validators.username,
        email: validators.email,
        password: validators.password,
        password2: validators.password2,
    });

    if (isAuthenticated) return <Redirect to="/dashboard" />;
    return (
        <Form
            initialValues={{
                name: '',
                username: '',
                email: '',
                password: '',
                password2: '',
            }}
            validationSchema={signUpValidation}
            onSubmit={signUp}>
            <Form.Element>
                <h2>Join our community</h2>
                <p>Make the most of your career in development.</p>
                <Form.Field.Input autoFocus label="Name" name="name" />
                <Form.Field.Input label="Username" name="username" />
                <Form.Field.Input label="Email" name="email" type="email" />
                <Form.Field.Input
                    label="Password"
                    name="password"
                    type="password"
                    tip="Password must contain a mix of letters, numbers and symbols"
                />
                <Form.Field.Input
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    tip="Please confirm your password"
                />
                <Form.Buttons submitText="Join" />
            </Form.Element>
        </Form>
    );
};

SignUp.propTypes = propTypes;

export default connect(mapStateToProps, { setAlert, signUp, clearAlerts })(SignUp);
