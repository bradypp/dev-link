/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/auth';

const propTypes = {
    isAuthenticated: PropTypes.bool,
    component: PropTypes.object.isRequired,
};

const defaultProps = {
    isAuthenticated: false,
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...otherProps }) => {
    return (
        <Route
            {...otherProps}
            render={props =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />
            }
        />
    );
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectIsAuthenticated,
});

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default connect(mapStateToProps)(PrivateRoute);
