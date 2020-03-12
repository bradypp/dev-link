import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    Landing,
    Login,
    Register,
    Dashboard,
    CreateProfile,
    EditProfile,
    Alert,
    Navbar,
    AddExperience,
    AddEducation,
    Profile,
} from 'components';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Landing} />
            </Switch>
            <section className="container">
                <Alert />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/create" component={CreateProfile} />
                    <PrivateRoute exact path="/edit" component={EditProfile} />
                    <PrivateRoute exact path="/add-experience" component={AddExperience} />
                    <PrivateRoute exact path="/add-education" component={AddEducation} />
                </Switch>
            </section>
        </Router>
    );
};

export default Routes;
