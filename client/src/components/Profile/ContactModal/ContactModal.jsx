import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal, Divider } from 'shared/components';
import { updateProfile } from 'redux/profile';
import { ContactForm } from './ContactForm/ContactForm';
import { StyledCustomLink, ItemContainer, ContentContainer } from './ContactModalStyles';

const mapDispatchToProps = {
    updateProfile,
};

const ContactModal = ({ contact, socials, isCurrentUser, updateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <Modal
            width="60rem"
            renderLink={({ open }) => (
                <Button
                    onClick={open}
                    variant="bordered-inset"
                    color="primary"
                    backgroundColor="primary"
                    borderColor="primary">
                    Contact Info
                </Button>
            )}
            renderContent={({ close }) => (
                <>
                    {!isEditing ? (
                        <ContentContainer>
                            {!isEmpty(contact) && (
                                <ItemContainer>
                                    <h2>Contact Info</h2>
                                    <ul>
                                        {contact.map(({ name, value }) => (
                                            <li key={uuidv4()}>
                                                {name}: {value}
                                            </li>
                                        ))}
                                    </ul>
                                </ItemContainer>
                            )}
                            {!isEmpty(socials) && !isEmpty(contact) && <Divider />}
                            {!isEmpty(socials) && (
                                <ItemContainer>
                                    <h2>Socials</h2>
                                    <ul>
                                        {socials.map(({ name, value }) => (
                                            <li key={uuidv4()}>
                                                {name}:{' '}
                                                <StyledCustomLink href={value}>
                                                    {value}
                                                </StyledCustomLink>
                                            </li>
                                        ))}
                                    </ul>
                                </ItemContainer>
                            )}
                            {isCurrentUser && (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    backgroundColor="primary"
                                    color="white1">
                                    Edit
                                </Button>
                            )}
                            <Button
                                onClick={close}
                                variant="bordered-inset"
                                borderColor="primary"
                                backgroundColor="primary"
                                color="primary">
                                Close
                            </Button>
                        </ContentContainer>
                    ) : (
                        <ContactForm
                            formData={{ contact, socials }}
                            setIsEditing={setIsEditing}
                            updateProfile={updateProfile}
                        />
                    )}
                </>
            )}
        />
    );
};

export default connect(null, mapDispatchToProps)(ContactModal);
