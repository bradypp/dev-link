import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useClearAlerts } from 'shared/hooks';

const propTypes = {};

const stateToProps = {};

const Dashboard = () => {
    useClearAlerts();
    return <div>dashboard</div>;
};

Dashboard.propTypes = propTypes;

const mapStateToProps = createStructuredSelector(stateToProps);

export default connect(mapStateToProps)(Dashboard);
