import React from 'react';
import { useLoadUser } from 'utils';
import Routes from './Routes';
import './styles/app.scss';

const App = () => {
    useLoadUser();
    return <Routes />;
};

export default App;
