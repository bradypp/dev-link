import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updatePassword } from 'redux/auth';
import { Modal, Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';

const propTypes = {
    updatePassword: PropTypes.func.isRequired,
    renderLink: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
    updatePassword,
};

const UpdatePassword = ({ renderLink, updatePassword }) => {
    const updatePasswordValidation = Yup.object().shape({
        current_password: validators.required('Current password is required'),
        password: validators.password,
        password2: validators.password2,
    });

    return (
        <Modal
            renderLink={renderLink}
            renderContent={({ close }) => (
                <>
                    <h2>Update Password</h2>
                    <Form
                        initialValues={{
                            current_password: '',
                            password: '',
                            password2: '',
                        }}
                        validationSchema={updatePasswordValidation}
                        onSubmit={values => {
                            updatePassword(values);
                            close();
                        }}>
                        <Form.Element>
                            <Form.Field.Input
                                label="Current Password *"
                                name="current_password"
                                type="password"
                                tip="Please enter your current password to change it"
                                tipLocation="bottom"
                            />
                            <Form.Field.Input
                                label="Password *"
                                name="password"
                                type="password"
                                tip="Password must contain a mix of letters, numbers and symbols"
                                tipLocation="bottom"
                            />
                            <Form.Field.Input
                                label="Confirm Password *"
                                name="password2"
                                type="password"
                                tip="Please confirm your password"
                                tipLocation="bottom"
                            />
                            <Form.Buttons withCancel onCancel={close} />
                        </Form.Element>
                    </Form>
                </>
            )}
        />
    );
};

UpdatePassword.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
