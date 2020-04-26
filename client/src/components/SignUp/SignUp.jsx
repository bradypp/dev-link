import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from 'redux/alerts';
import { signUp, selectIsAuthenticated } from 'redux/auth';
import { Main, Form, Button } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import { validators } from 'shared/utils';
import * as Yup from 'yup';
import * as S from './SignUpStyles';

const propTypes = {
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

// TODO: add location to sign up?
// TODO: styling
const SignUp = ({ signUp, isAuthenticated }) => {
    useClearAlerts();

    const signUpValidation = Yup.object().shape({
        name: validators.name,
        username: validators.username,
        email: validators.email,
        password: validators.password,
        password2: validators.password,
    });

    if (isAuthenticated) return <Redirect to="/dashboard" />;
    return (
        <Main>
            <S.Container>
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
                        <Form.Field.Input label="Name" name="name" type="text" placeholder="Name" />
                        <Form.Field.Input
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Username"
                        />
                        <Form.Field.Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                        <Form.Field.Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            tip="Password must contain a mix of letters, numbers and symbols"
                        />
                        <Form.Field.Input
                            label="Confirm Password"
                            name="password2"
                            type="password"
                            placeholder="Confirm Password"
                            tip="Please confirm your password"
                        />
                        <Button type="submit">Submit</Button>
                    </Form.Element>
                </Form>
            </S.Container>
        </Main>
    );
};

SignUp.propTypes = propTypes;

export default connect(mapStateToProps, { setAlert, signUp, clearAlerts })(SignUp);
