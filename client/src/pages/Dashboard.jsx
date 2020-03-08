import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import DashboardActions from './DashboardActions';
// import Experience from './Experience';
// import Education from './Education';
// import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = () => {
    const profileView = () => {
        // return profile !== null ? (
        //     <>
        //         {/* <DashboardActions />
        //             <Experience experience={profile.experience} />
        //             <Education education={profile.education} /> */}
        //         <div className="my-2">
        //             <button className="btn btn-danger" onClick={() => deleteAccount()}>
        //                 <i className="fas fa-user-minus" /> Delete My Account
        //             </button>
        //         </div>
        //     </>
        // ) : (
        //     <>
        //         <p>You have not yet setup a profile, please add some info</p>
        //         <Link to="/create-profile" className="btn btn-primary my-1">
        //             Create Profile
        //         </Link>
        //     </>
        // );
    };

    // useEffect(() => {
    //     getCurrentProfile();
    // }, [getCurrentProfile]);

    return (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {'name'}
            </p>
            {profileView()}
        </>
    );
};

// Dashboard.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     deleteAccount: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired,
// };

const mapStateToProps = createStructuredSelector({});

// const mapStateToProps = state => ({
//     auth: state.auth,
//     profile: state.profile,
// });

export default compose(connect(mapStateToProps))(Dashboard);
