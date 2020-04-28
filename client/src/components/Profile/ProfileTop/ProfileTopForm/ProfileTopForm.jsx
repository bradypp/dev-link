import React from 'react';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
// import Image from 'react-image';
import { Button, Icon } from 'shared/components';
import { EditModal } from 'components';
import { updateProfile } from 'redux/profile';
// import * as S from './ProfileTopStyles';

const propTypes = {
    formData: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    updateProfile,
};

const ProfileTopForm = ({ updateProfile, formData }) => {
    const {
        avatar,
        headline,
        currentPosition,
        city,
        country,
        website,
        githubUsername,
        company,
        name,
        currentUser,
        socials,
        contact,
        skills,
    } = formData;

    // TODO: automatically set profile name to user name
    return (
        <EditModal
            renderContent={({ close }) => (
                <>
                    <h2>Edit Intro</h2>
                    <Button onClick={close}>Close</Button>
                </>
            )}
        />
    );
};

ProfileTopForm.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(ProfileTopForm);
