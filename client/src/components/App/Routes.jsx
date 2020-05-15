import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Account, Profile, Profiles, Header, Footer } from 'components';
import { PrivateRoute } from 'shared/components';

const Routes = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/profile" component={Profile} />
                <Route path="/developers" component={Profiles} />
                <PrivateRoute path="/account" component={Account} />
                <Route component="/" />
            </Switch>
            <Footer />
        </Router>
    );
};

export default Routes;
