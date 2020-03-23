/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/auth';

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

export default connect(mapStateToProps)(PrivateRoute);
