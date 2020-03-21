import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner } from 'components/shared';
import { getProfiles, selectIsProfileLoading, selectAllProfiles } from 'redux/profile';
import ProfileItem from './ProfileItem/ProfileItem';

const Profiles = ({ getProfiles, profilesLoading, allProfiles }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    const renderProfiles = () =>
        allProfiles.length > 0 ? (
            allProfiles.map(profileData => <ProfileItem key={uuidv4()} profileData={profileData} />)
        ) : (
            <h4>No profiles found...</h4>
        );

    return (
        <>
            {profilesLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop" /> Browse and connect with developers
                    </p>
                    <div className="profiles">{renderProfiles()}</div>
                </>
            )}
        </>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profilesLoading: PropTypes.bool.isRequired,
    allProfiles: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profilesLoading: selectIsProfileLoading,
    allProfiles: selectAllProfiles,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
