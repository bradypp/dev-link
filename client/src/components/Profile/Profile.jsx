import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Main, SectionHeading } from 'shared/components';
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

    return (
        <Main>
            <SectionHeading>Hello!</SectionHeading>
            <ProfileTop />
            {/* bio card */}
            {/* languages & skills card */}
            {/* interests card */}
        </Main>
    );
};

Profile.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Profile);
