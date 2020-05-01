import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const propTypes = {};

const mapStateToProps = createStructuredSelector({});

const Dashboard = () => {
    return <div>dashboard</div>;
};

Dashboard.propTypes = propTypes;

export default connect(mapStateToProps)(Dashboard);
