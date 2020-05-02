import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
import { Button, Modal } from 'shared/components';

const propTypes = {
    renderContent: PropTypes.func.isRequired,
};

const EditModal = ({ renderContent, ...props }) => (
    <Modal
        {...props}
        renderLink={({ open }) => <Button icon={<FaEdit />} onClick={open} />}
        renderContent={renderContent}
    />
);

EditModal.propTypes = propTypes;

export default EditModal;
