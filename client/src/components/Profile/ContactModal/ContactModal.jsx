import React from 'react';
import { Button, Modal } from 'shared/components';
import {} from './ContactModalStyles';

// TODO: styling
// TODO: Conditional appearance based on if profile belongs to current authenticated user
const Contact = ({ name, contact }) => {
    const { email, phone } = contact;

    return (
        <Modal
            renderLink={modal => <Button onClick={modal.open}>Contact</Button>}
            renderContent={modal => (
                <div>
                    <h1>{name}</h1>
                    <h2>Contact Info</h2>
                    <h3>Email</h3>
                    <p>{email}</p>
                    <h3>Phone</h3>
                    <p>{phone}</p>
                    <Button onClick={modal.close}>Close</Button>
                </div>
            )}
        />
    );
};

export default Contact;
