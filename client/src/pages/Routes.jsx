import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Alert, Navbar } from 'components';
import { Landing, Login, Register } from 'pages';

const Routes = () => (
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
            </Switch>
        </section>
    </Router>
);

export default Routes;
