import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    SignIn,
    SignUp,
    Dashboard,
    CreateProfile,
    EditProfile,
    Alert,
    AddExperience,
    AddEducation,
    Profile,
    Profiles,
    NotFound,
} from 'components';
import { PrivateRoute } from 'components/shared';

const Routes = () => {
    return (
        // TODO: Remove container & use section styled component instead
        // TODO: Move alert to App.jsx
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/profiles" component={Profiles} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create" component={CreateProfile} />
                <PrivateRoute exact path="/edit" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
