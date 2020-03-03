import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Navbar } from 'components';
import { Routes } from 'pages';
import 'styles/main.scss';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Navbar />
                    <Routes />
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default App;
