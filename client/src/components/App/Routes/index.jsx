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
    Posts,
    Post,
    NotFound,
} from 'components';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
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
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:id" component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
