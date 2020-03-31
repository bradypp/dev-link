import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { Spinner, Button } from 'shared/components';
import { clearAlerts, selectAlerts } from 'redux/alerts';
import { selectUserFirstName, deleteAccount, selectUserId } from 'redux/auth';
import {
    getProfile,
    selectProfile,
    selectIsProfileLoading,
    selectProfileEducation,
    selectProfileExperience,
} from 'redux/profiles';
import Education from './Education/Education';
import DashboardActions from './DashboardActions/DashboardActions';
import Experience from './Experience/Experience';

const Dashboard = ({
    getProfile,
    deleteAccount,
    userFirstName,
    profileData,
    isProfileLoading,
    profileEducation,
    profileExperience,
    clearAlerts,
    alerts,
    userId,
}) => {
    useEffect(() => {
        getProfile(userId);
    }, [getProfile, userId]);

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
                                <Button onClick={deleteAccount} color="danger">
                                    Delete My Account
                                </Button>
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
    getProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    userFirstName: PropTypes.string.isRequired,
    profileData: PropTypes.object.isRequired,
    isProfileLoading: PropTypes.bool.isRequired,
    profileEducation: PropTypes.array.isRequired,
    profileExperience: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
    userFirstName: selectUserFirstName,
    profileData: selectProfile,
    isProfileLoading: selectIsProfileLoading,
    profileEducation: selectProfileEducation,
    profileExperience: selectProfileExperience,
    userId: selectUserId,
    alerts: selectAlerts,
});

export default compose(connect(mapStateToProps, { getProfile, clearAlerts, deleteAccount }))(
    Dashboard,
);
