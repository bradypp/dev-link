import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home, Account, Profile, Profiles, Header, Footer } from 'components';
import { PrivateRoute, ScrollToTop } from 'shared/components';
import Helmet from './Helmet';

const Routes = () => {
    return (
        <Router>
            <Helmet />
            <Header />
            <ScrollToTop>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/profile/:username" component={Profile} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/developers" component={Profiles} />
                    <PrivateRoute path="/account" component={Account} />
                    <Route component={() => <Redirect to="/" />} />
                </Switch>
            </ScrollToTop>
            <Footer />
        </Router>
    );
};

export default Routes;
