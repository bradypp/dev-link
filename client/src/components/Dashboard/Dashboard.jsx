import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash.isempty';
import { Spinner, CustomButton } from 'shared/components';
import { clearAlerts, selectAlerts } from 'redux/alerts';
import { selectUserFirstName, deleteAccount } from 'redux/auth';
import {
    getCurrentUserProfile,
    selectProfile,
    selectIsProfileLoading,
    selectProfileEducation,
    selectProfileExperience,
} from 'redux/profiles';
import Education from './Education/Education';
import DashboardActions from './DashboardActions/DashboardActions';
import Experience from './Experience/Experience';

const Dashboard = ({
    getCurrentUserProfile,
    deleteAccount,
    userFirstName,
    profileData,
    isProfileLoading,
    profileEducation,
    profileExperience,
    clearAlerts,
    alerts,
}) => {
    useEffect(() => {
        getCurrentUserProfile();
    }, [getCurrentUserProfile]);

    useEffect(() => {
        if (alerts.length > 0) {
            clearAlerts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            {isProfileLoading && isEmpty(profileData) ? (
                <Spinner />
            ) : (
                <>
                    <p className="lead">Welcome {userFirstName && userFirstName}!</p>
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
                                <CustomButton onClick={deleteAccount} color="danger">
                                    Delete My Account
                                </CustomButton>
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
    clearAlerts: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    userFirstName: PropTypes.string.isRequired,
    profileData: PropTypes.object.isRequired,
    isProfileLoading: PropTypes.bool.isRequired,
    profileEducation: PropTypes.array.isRequired,
    profileExperience: PropTypes.array.isRequired,
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    userFirstName: selectUserFirstName,
    profileData: selectProfile,
    isProfileLoading: selectIsProfileLoading,
    profileEducation: selectProfileEducation,
    profileExperience: selectProfileExperience,
    alerts: selectAlerts,
});

export default compose(
    connect(mapStateToProps, { getCurrentUserProfile, clearAlerts, deleteAccount }),
)(Dashboard);
