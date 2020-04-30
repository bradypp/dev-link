import React from 'react';
import { Button, Modal, OutboundLink } from 'shared/components';
import { StyledOutboundLink } from './ContactModalStyles';

// TODO: styling button as a link
// TODO: conditional appearance based on if profile belongs to current authenticated user (for editing)
const Contact = ({ contact, socials }) => {
    const { email, phone } = contact;

    return (
        <Modal
            width="60rem"
            renderLink={({ open }) => <Button onClick={open}>Contact Info</Button>}
            renderContent={({ close }) => (
                <>
                    <h2>Contact Info</h2>
                    {email && (
                        <>
                            <h3>Email</h3>
                            <p>{email}</p>
                        </>
                    )}
                    {phone && (
                        <>
                            <h3>Phone</h3>
                            <p>{phone}</p>
                        </>
                    )}
                    {socials.map(({ name, link }) => (
                        <>
                            <h3>{name}</h3>
                            <StyledOutboundLink href={link}>{link}</StyledOutboundLink>
                        </>
                    ))}
                    <Button onClick={close}>Close</Button>
                </>
            )}
        />
    );
};

export default Contact;
