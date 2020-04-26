import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from 'redux/alerts';
import { signUp, selectIsAuthenticated } from 'redux/auth';
import { Main, Form, Button } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import * as S from './SignUpStyles';

const propTypes = {
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

// TODO: styling
const SignUp = ({ signUp, isAuthenticated }) => {
    useClearAlerts();

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    // TODO: update password tip
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
                            tip="Ensure your password has a mix of letters, symbols & numbers and is at least 8 characters long"
                        />
                        <Form.Field.Input
                            label="Confirm Password"
                            name="passwords"
                            type="password"
                            placeholder="Confirm Password"
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
