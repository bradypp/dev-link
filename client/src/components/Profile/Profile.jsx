import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Main } from 'shared/components';
import { getProfileByUsername } from 'redux/profiles';
import ProfileTop from './ProfileTop/ProfileTop';

const propTypes = {
    getProfileByUsername: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    getProfileByUsername,
};

const Profile = ({ getProfileByUsername }) => {
    const { username } = useParams();

    useEffect(() => {
        getProfileByUsername(username);
    }, [getProfileByUsername, username]);

    // TODO: Conditional appearance for different components/buttons (such as contact, social & education etc) based on if profile belongs to current authenticated user or not. If it is the currently authenticated users profile, have prompts to edit/add profile info, that's if they haven't already clicked to remove that from their profile?
    return (
        <Main>
            <ProfileTop />
            {/* bio card */}
            {/* languages & skills card */}
            {/* interests card */}
            {/* profile sidebar */}
        </Main>
    );
};

Profile.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Profile);
