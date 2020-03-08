import React from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'pages';
import { store } from 'redux/store';
import { useLoadUser } from 'utils';
import 'styles/app.scss';

const App = () => {
    useLoadUser();
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

export default App;
