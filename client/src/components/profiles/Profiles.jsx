import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, ProfileItem } from 'components';
import { getProfiles, selectIsProfileLoading, selectAllProfiles } from 'redux/profile';

const Profiles = ({ getProfiles, profilesLoading, allProfiles }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    const renderProfiles = () =>
        allProfiles.length > 0 ? (
            allProfiles.map(profileData => (
                <ProfileItem key={profileData._id} profileData={profileData} />
            ))
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
