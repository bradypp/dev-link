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
                    <PrivateRoute exact path="/profile/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/profile/create" component={CreateProfile} />
                    <PrivateRoute exact path="/profile/edit" component={EditProfile} />
                    <PrivateRoute exact path="/profile/add-experience" component={AddExperience} />
                    <PrivateRoute exact path="/profile/add-education" component={AddEducation} />
                </Switch>
            </section>
        </Router>
    );
};

export default Routes;
