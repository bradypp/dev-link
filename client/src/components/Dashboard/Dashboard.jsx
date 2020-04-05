import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useClearAlerts } from 'shared/hooks';

const propTypes = {};

const Dashboard = () => {
    useClearAlerts();
    return <div>dashboard</div>;
};

Dashboard.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Dashboard);
