import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser, updateUser } from 'redux/auth';
import { Modal, Form } from 'shared/components';
import { validators } from 'shared/utils';
import * as Yup from 'yup';

const propTypes = {
    user: PropTypes.object.isRequired,
    renderLink: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    user: selectUser,
});

const mapDispatchToProps = {
    updateUser,
};

const UpdateUser = ({ user, renderLink, updateUser }) => {
    const { name, username, email } = user;

    const userValidation = Yup.object().shape({
        name: validators.name,
        username: validators.username,
        email: validators.email,
    });

    return (
        <Modal
            renderLink={renderLink}
            renderContent={({ close }) => (
                <>
                    <h2>Update Account Details</h2>
                    <Form
                        initialValues={{
                            name,
                            username,
                            email,
                        }}
                        validationSchema={userValidation}
                        onSubmit={values => {
                            updateUser(values);
                            close();
                        }}>
                        <Form.Element>
                            <Form.Field.Input autoFocus label="Name *" name="name" />
                            <Form.Field.Input label="Username *" name="username" />
                            <Form.Field.Input label="Email *" name="email" type="email" />
                            <Form.Buttons withCancel onCancel={close} />
                        </Form.Element>
                    </Form>
                </>
            )}
        />
    );
};

UpdateUser.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
