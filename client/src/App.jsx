import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Navbar } from 'components';
import { Routes, HomePage } from 'pages';
import { store, persistor } from './redux/store';
import 'styles/app.scss';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Routes />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
