import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash.isempty';
import { Spinner, DashboardActions, Education, Experience } from 'components';
import { selectUserFirstName } from 'redux/auth';
import {
    getCurrentUserProfile,
    deleteAccount,
    selectProfileData,
    selectProfileLoading,
    selectProfileEducation,
    selectProfileExperience,
} from 'redux/profile';

const Dashboard = ({
    getCurrentUserProfile,
    deleteAccount,
    userFirstName,
    profileData,
    profileLoading,
    profileEducation,
    profileExperience,
}) => {
    useEffect(() => {
        getCurrentUserProfile();
    }, [getCurrentUserProfile]);

    return (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            {profileLoading && isEmpty(profileData) ? (
                <Spinner />
            ) : (
                <>
                    <p className="lead">
                        <i className="fas fa-user" /> Welcome {userFirstName && userFirstName}!
                    </p>
                    {!isEmpty(profileData) ? (
                        <>
                            <DashboardActions />
                            {profileExperience.length > 0 && (
                                <Experience experience={profileExperience} />
                            )}
                            {profileEducation.length > 0 && (
                                <Education education={profileEducation} />
                            )}
                            <div className="my-2">
                                <button
                                    className="btn btn-danger"
                                    onClick={deleteAccount}
                                    type="button">
                                    <i className="fas fa-user-minus" /> Delete My Account
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to="/create" className="btn btn-primary my-1">
                                Create Profile
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    );
};

Dashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    userFirstName: PropTypes.string.isRequired,
    profileData: PropTypes.object.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    profileEducation: PropTypes.array.isRequired,
    profileExperience: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    userFirstName: selectUserFirstName,
    profileData: selectProfileData,
    profileLoading: selectProfileLoading,
    profileEducation: selectProfileEducation,
    profileExperience: selectProfileExperience,
});

export default compose(connect(mapStateToProps, { getCurrentUserProfile, deleteAccount }))(
    Dashboard,
);
