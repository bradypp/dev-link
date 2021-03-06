/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/auth';

const propTypes = {
    component: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
};

const defaultProps = {
    isAuthenticated: false,
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

const PrivateRoute = ({ component: Component, isAuthenticated, ...props }) => {
    return (
        <Route
            {...props}
            render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default connect(mapStateToProps)(PrivateRoute);
