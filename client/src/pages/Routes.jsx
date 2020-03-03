import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Register } from 'components';
import { HomePage } from 'pages';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <section className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </section>
    </Switch>
);

export default Routes;
