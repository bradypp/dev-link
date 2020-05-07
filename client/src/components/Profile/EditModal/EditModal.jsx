import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'shared/components';
import { ButtonsContainer } from './EditModalStyles';

const propTypes = {
    renderContent: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    withAdd: PropTypes.bool,
};

const defaultProps = {
    onDelete: undefined,
    withAdd: false,
};

const EditModal = ({ renderContent, onDelete, withAdd, ...props }) => (
    <Modal
        {...props}
        onDelete={onDelete}
        withDeleteButton={onDelete && !withAdd}
        renderLink={({ open }) => (
            <ButtonsContainer>
                {withAdd ? (
                    <Form.AddButton onClick={open} />
                ) : (
                    <>
                        {onDelete && <Form.DeleteButton onClick={onDelete} />}
                        <Form.EditButton onClick={open} />
                    </>
                )}
            </ButtonsContainer>
        )}
        renderContent={renderContent}
    />
);

EditModal.propTypes = propTypes;
EditModal.defaultProps = defaultProps;

export default EditModal;
