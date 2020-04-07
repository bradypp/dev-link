import React from 'react';
import { useLoadUser } from 'shared/hooks';
import ThemeProvider from './ThemeProvider';
import Routes from './Routes';
import GlobalStyle from './GlobalStyle';

const App = () => {
    useLoadUser();
    return (
        <ThemeProvider>
            <GlobalStyle />
            <Routes />
        </ThemeProvider>
    );
};

export default App;
