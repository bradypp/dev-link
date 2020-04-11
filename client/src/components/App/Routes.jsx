import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    Home,
    SignIn,
    SignUp,
    Dashboard,
    Profile,
    Profiles,
    Header,
    Alert,
    NotFound,
} from 'components';
import { PrivateRoute } from 'shared/components';

const Routes = () => {
    return (
        <Router>
            <Alert />
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/search" component={Profiles} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routes;
