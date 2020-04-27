import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const propTypes = {};

const stateToProps = {};

const Dashboard = () => {
    return <div>dashboard</div>;
};

Dashboard.propTypes = propTypes;

const mapStateToProps = createStructuredSelector(stateToProps);

export default connect(mapStateToProps)(Dashboard);
