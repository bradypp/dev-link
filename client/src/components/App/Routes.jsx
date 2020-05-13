import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Account, Profile, Profiles, Header, Alert, NotFound } from 'components';
import { PrivateRoute } from 'shared/components';

const Routes = () => {
    return (
        <Router>
            <Alert />
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/profile" component={Profile} />
                <Route path="/developers" component={Profiles} />
                <PrivateRoute path="/account" component={Account} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routes;
