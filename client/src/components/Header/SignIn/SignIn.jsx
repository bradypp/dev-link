import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from 'redux/auth';
import { Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';

const propTypes = {
    signIn: PropTypes.func.isRequired,
};

const SignIn = ({ signIn }) => {
    const signInValidation = Yup.object().shape({
        login: validators.required('Login is required'),
        password: validators.required('Password is required'),
    });

    return (
        <Form
            initialValues={{
                login: '',
                password: '',
            }}
            validationSchema={signInValidation}
            onSubmit={signIn}>
            <Form.Element>
                <h2>Welcome Back!</h2>
                <Form.Field.Input autoFocus label="Email or username" name="login" />
                <Form.Field.Input label="Password" name="password" type="password" />
                <Form.Buttons submitText="Sign In" />
            </Form.Element>
        </Form>
    );
};

SignIn.propTypes = propTypes;

export default connect(null, { signIn })(SignIn);
