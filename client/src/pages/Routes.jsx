import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Register, Alert } from 'components';

const Routes = () => (
    <section className="container">
        <Alert />
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </section>
);

export default Routes;
