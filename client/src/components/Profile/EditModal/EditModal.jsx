import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'shared/components';
import { ButtonsContainer } from './EditModalStyles';

const propTypes = {
    renderContent: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
};

const defaultProps = {
    onDelete: undefined,
};

const EditModal = ({ renderContent, onDelete, ...props }) => (
    <Modal
        {...props}
        renderLink={({ open }) => (
            <ButtonsContainer>
                {onDelete && <Form.DeleteButton onClick={onDelete} />}
                <Form.EditButton onClick={open} />
            </ButtonsContainer>
        )}
        renderContent={renderContent}
    />
);

EditModal.propTypes = propTypes;
EditModal.defaultProps = defaultProps;

export default EditModal;
