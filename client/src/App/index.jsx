import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing, Navbar } from 'components';
import { useLoadUser } from 'utils';
import Routes from './Routes';
import './styles/app.scss';

const App = () => {
    useLoadUser();
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
            </Switch>
        </Router>
    );
};

export default App;
