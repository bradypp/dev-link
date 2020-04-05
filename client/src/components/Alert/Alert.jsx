import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectAlerts } from 'redux/alerts';
import { connect } from 'react-redux';

const propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// TODO: styling
const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => <div key={alert.id}>{alert.message}</div>);

Alert.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
    alerts: selectAlerts,
});

export default connect(mapStateToProps)(Alert);
