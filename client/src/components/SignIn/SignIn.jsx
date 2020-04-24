import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signIn, selectIsAuthenticated } from 'redux/auth';
import { useClearAlerts } from 'shared/hooks';
import { Form, Button, Main } from 'shared/components';
import * as S from './SignInStyles';

const propTypes = {
    signIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

// TODO: styling
const SignIn = ({ signIn, isAuthenticated }) => {
    useClearAlerts();

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <Main>
            <Form
                initialValues={{
                    login: '',
                    password: '',
                }}
                onSubmit={signIn}>
                <S.StyledForm>
                    <Form.Input
                        label="Login"
                        name="login"
                        type="text"
                        tip="Please enter your username or email"
                    />
                    <Form.Input
                        label="Password"
                        name="password"
                        type="password"
                        tip="Please enter your password"
                    />
                    <Button type="submit">Submit</Button>
                </S.StyledForm>
            </Form>
        </Main>
    );
};

SignIn.propTypes = propTypes;

export default connect(mapStateToProps, { signIn })(SignIn);
