import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Spinner } from 'components';
import { selectUserFirstName } from 'redux/auth';
import {
    getCurrentProfile,
    deleteAccount,
    selectProfileInfo,
    selectProfileLoading,
} from 'redux/profile';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    userFirstName,
    profileInfo,
    profileLoading,
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            {profileLoading && !profileInfo ? (
                <Spinner />
            ) : (
                <>
                    <p className="lead">
                        <i className="fas fa-user" /> Welcome {userFirstName && userFirstName}!
                    </p>
                    {profileInfo !== null ? (
                        <>
                            {/* <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} /> */}
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
                            <Link to="/profile/create" className="btn btn-primary my-1">
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
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    userFirstName: PropTypes.string.isRequired,
    profileInfo: PropTypes.object.isRequired,
    profileLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    userFirstName: selectUserFirstName,
    deleteAccount,
    profileInfo: selectProfileInfo,
    profileLoading: selectProfileLoading,
});

export default compose(connect(mapStateToProps, { getCurrentProfile }))(Dashboard);
