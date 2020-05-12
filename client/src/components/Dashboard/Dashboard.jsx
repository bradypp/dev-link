import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const propTypes = {};

const mapStateToProps = createStructuredSelector({});

const Dashboard = () => {
    return <div>
    {/* 
        Update user details
        Change password
        Delete profile
        Deactivate account
        Delete account
     */}
    </div>;
};

Dashboard.propTypes = propTypes;

export default connect(mapStateToProps)(Dashboard);
