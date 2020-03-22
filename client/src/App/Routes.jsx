import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    Home,
    SignIn,
    SignUp,
    Dashboard,
    CreateProfile,
    EditProfile,
    AddExperience,
    AddEducation,
    Profile,
    Profiles,
    Navbar,
    Alert,
    NotFound,
} from 'components';
import { PrivateRoute } from 'components/shared';

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <Alert />
            <Switch>
                <Route exact path="/" component={Home} />
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
        </Router>
    );
};

export default Routes;
