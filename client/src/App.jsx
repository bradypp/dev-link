import React from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'pages';
import { store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useLoadUser } from 'utils';
import 'styles/app.scss';

const App = () => {
    // useLoadUser();
    return <Routes />;
};

export default App;
