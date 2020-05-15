import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from 'redux/auth';
import { Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';

const propTypes = {
    signUp: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};

const defaultProps = {
    onSubmit: undefined,
    onCancel: undefined,
};

const SignUp = ({ signUp, onCancel, onSubmit }) => {
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
            onSubmit={values => {
                signUp(values);
                onSubmit();
            }}>
            <Form.Element>
                <h2>Join our community</h2>
                <p>Make the most of your career as a developer.</p>
                <Form.Field.Input autoFocus label="Name *" name="name" />
                <Form.Field.Input label="Username *" name="username" />
                <Form.Field.Input label="Email *" name="email" type="email" />
                <Form.Field.Input
                    label="Password *"
                    name="password"
                    type="password"
                    tip="Password must contain a mix of letters, numbers and symbols"
                    tipLocation="below"
                />
                <Form.Field.Input
                    label="Confirm Password *"
                    name="password2"
                    type="password"
                    tip="Please confirm your password"
                    tipLocation="below"
                />
                <Form.Buttons submitText="Join" withCancel onCancel={onCancel} />
            </Form.Element>
        </Form>
    );
};

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default connect(null, { signUp })(SignUp);
