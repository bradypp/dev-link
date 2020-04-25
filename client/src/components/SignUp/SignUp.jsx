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

    return (
        <Main>
            <Form
                initialValues={{
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    password2: '',
                }}
                onSubmit={signUp}>
                <S.StyledForm>
                    <Form.Field.Input label="Name" name="name" type="text" />
                    <Form.Field.Input label="Username" name="username" type="text" />
                    <Form.Field.Input label="Email" name="email" type="email" />
                    <Form.Field.Input label="Password" name="password" type="password" />
                    <Form.Field.Input label="Confirm password" name="passwords" type="password" />
                    <Button type="submit">Submit</Button>
                </S.StyledForm>
            </Form>
        </Main>
    );
};

SignUp.propTypes = propTypes;

export default connect(mapStateToProps, { setAlert, signUp, clearAlerts })(SignUp);
