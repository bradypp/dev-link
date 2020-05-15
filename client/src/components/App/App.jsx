import React from 'react';
import { useLoadUser, useToast } from 'shared/hooks';
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
            <Routes />
        </ThemeProvider>
    );
};

export default App;
