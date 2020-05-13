import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from 'redux/alerts';
import { signUp } from 'redux/auth';
import { Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';
// import * as S from './SignUpStyles';

const propTypes = {
    signUp: PropTypes.func.isRequired,
};

// TODO: add location to sign up?
// TODO: decide on redirect
// TODO: edit styling (look at other websites)
const SignUp = ({ signUp }) => {
    const signUpValidation = Yup.object().shape({
        name: validators.name,
        username: validators.username,
        email: validators.email,
        password: validators.password,
        password2: validators.password2,
    });

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
                <p>Make the most of your career as a developer.</p>
                <Form.Field.Input autoFocus label="Name" name="name" />
                <Form.Field.Input label="Username" name="username" />
                <Form.Field.Input label="Email" name="email" type="email" />
                <Form.Field.Input
                    label="Password"
                    name="password"
                    type="password"
                    tip="Password must contain a mix of letters, numbers and symbols"
                    tipLocation="bottom"
                />
                <Form.Field.Input
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    tip="Please confirm your password"
                    tipLocation="bottom"
                />
                <Form.Buttons submitText="Join" />
            </Form.Element>
        </Form>
    );
};

SignUp.propTypes = propTypes;

export default connect(null, { setAlert, signUp, clearAlerts })(SignUp);
