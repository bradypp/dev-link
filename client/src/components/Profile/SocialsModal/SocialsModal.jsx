import React from 'react';
import { Button, Modal } from 'shared/components';
import {} from './SocialsModalStyles';

// TODO: styling
const Socials = ({ name, socials }) => {
    return (
        <Modal
            renderLink={modal => <Button onClick={modal.open}>Socials</Button>}
            renderContent={modal => (
                <div>
                    <h1>{name}</h1>
                    <h2>Socials</h2>
                    {socials.map(social => (
                        <>
                            <h3>{social.name}</h3>
                            <p>{social.link}</p>
                        </>
                    ))}
                    <Button onClick={modal.close}>Close</Button>
                </div>
            )}
        />
    );
};

export default Socials;
