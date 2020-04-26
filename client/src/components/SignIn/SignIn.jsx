import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signIn, selectIsAuthenticated } from 'redux/auth';
import { useClearAlerts } from 'shared/hooks';
import { Form, Button, Main } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';
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

    const signInValidation = Yup.object().shape({
        login: validators.required('Login is required'),
        password: validators.required('Password is required'),
    });

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <Main>
            <S.Container>
                <Form
                    initialValues={{
                        login: '',
                        password: '',
                    }}
                    validationSchema={signInValidation}
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
                        <Button type="submit">Submit</Button>
                    </Form.Element>
                </Form>
            </S.Container>
        </Main>
    );
};

SignIn.propTypes = propTypes;

export default connect(mapStateToProps, { signIn })(SignIn);
