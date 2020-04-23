import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const propTypes = {};

const Profiles = () => {
    return <div>profiles</div>;
};

Profiles.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Profiles);
