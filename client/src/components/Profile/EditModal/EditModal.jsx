import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'shared/components';

const propTypes = {
    renderContent: PropTypes.node.isRequired,
};

const EditModal = ({ renderContent }) => (
    <Modal
        renderLink={({ open }) => <Button iconSize="2.4rem" icon="edit" onClick={open} />}
        renderContent={renderContent}
    />
);

EditModal.propTypes = propTypes;

export default EditModal;
