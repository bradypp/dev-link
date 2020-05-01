import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signIn, selectIsAuthenticated } from 'redux/auth';
import { Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';
// import * as S from './SignInStyles';

const propTypes = {
    signIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

// TODO: edit styling (look at other websites)
const SignIn = ({ signIn, isAuthenticated }) => {
    const signInValidation = Yup.object().shape({
        login: validators.required('Login is required'),
        password: validators.required('Password is required'),
    });

    if (isAuthenticated) return <Redirect to="/dashboard" />;

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
                <p>Don't miss your next big opportunity.</p>
                <Form.Field.Input autoFocus label="Email or username *" name="login" />
                <Form.Field.Input label="Password *" name="password" type="password" />
                <Form.Buttons />
            </Form.Element>
        </Form>
    );
};

SignIn.propTypes = propTypes;

export default connect(mapStateToProps, { signIn })(SignIn);
