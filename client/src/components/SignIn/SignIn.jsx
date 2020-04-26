import React, { useState } from 'react';
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
            <S.Container>
                <Form
                    initialValues={{
                        login: '',
                        password: '',
                        checkbox: false,
                    }}
                    onSubmit={signIn}>
                    <Form.Element>
                        <Form.Field.Input
                            label="Login"
                            name="login"
                            type="text"
                            placeholder="Email or username"
                        />
                        <Form.Field.Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <Form.Field.Checkbox name="checkbox" type="checkbox" />
                        <Button type="submit">Submit</Button>
                    </Form.Element>
                </Form>
            </S.Container>
        </Main>
    );
};

SignIn.propTypes = propTypes;

export default connect(mapStateToProps, { signIn })(SignIn);
