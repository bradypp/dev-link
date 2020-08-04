import React from 'react';
import { useLoadUser, useToast } from 'shared/hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './ThemeProvider';
import Routes from './Routes';
import GlobalStyles from './GlobalStyles';
import NormalizeStyles from './NormalizeStyles';

const App = () => {
    useLoadUser();
    useToast();
    return (
        <ThemeProvider>
            <NormalizeStyles />
            <GlobalStyles />
            <Router>
                <Routes />
            </Router>
        </ThemeProvider>
    );
};

export default App;
