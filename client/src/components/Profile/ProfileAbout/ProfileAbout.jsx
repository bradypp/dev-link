import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {} from 'redux/profiles';
import { selectIsAuthenticated } from 'redux/auth';
import { setAlert } from 'redux/alerts';
import { Flex, Button } from 'shared/components';
import { ProfileCard } from '../ProfileStyles';
import {} from './ProfileAboutStyles';

const propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
    setAlert,
};

const ProfileTop = ({ isAuthenticated, setAlert }) => {
    return <ProfileCard></ProfileCard>;
};

ProfileTop.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTop);
