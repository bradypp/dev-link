import React from 'react';
import { useLoadUser } from 'shared/utils';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';
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
