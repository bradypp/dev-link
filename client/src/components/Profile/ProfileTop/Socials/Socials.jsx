import React from 'react';
import { Flex, Button, Modal } from 'shared/components';
import {} from './SocialsStyles';

// TODO: styling
const Socials = ({ name, profileSocials }) => {
    return (
        <Modal
            renderLink={modal => <Button onClick={modal.open}>Socials</Button>}
            renderContent={modal => (
                <Flex flexDirection="column">
                    <h1>{name}</h1>
                    <h2>Socials</h2>
                    {profileSocials.map(social => (
                        <>
                            <h3>{social.name}</h3>
                            <p>{social.link}</p>
                        </>
                    ))}
                    <Button onClick={modal.close}>Close</Button>
                </Flex>
            )}
        />
    );
};

export default Socials;
