import React from 'react';
import { Routes } from 'pages';
import { useLoadUser } from 'utils';
import 'styles/app.scss';

const App = () => {
    useLoadUser();
    return <Routes />;
};

export default App;
