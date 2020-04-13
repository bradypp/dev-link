import React from 'react';
import { Flex, Button, Modal } from 'shared/components';
import {} from './ContactStyles';

// TODO: styling
// TODO: Conditional appearance based on if profilem belongs to current authenticated user
const Contact = ({ name, profileContact }) => {
    const { email, phone } = profileContact;

    return (
        <Modal
            renderLink={modal => (
                <Button variant="link" onClick={modal.open}>
                    Contact
                </Button>
            )}
            renderContent={modal => (
                <Flex flexDirection="column">
                    <h1>{name}</h1>
                    <h2>Contact Info</h2>
                    <h3>Email</h3>
                    <p>{email}</p>
                    <h3>Phone</h3>
                    <p>{phone}</p>
                    <Button variant="link" onClick={modal.close}>
                        Close
                    </Button>
                </Flex>
            )}
        />
    );
};

export default Contact;
