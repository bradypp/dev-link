import React from 'react';
import { useLoadUser } from 'shared/hooks';
import { ThemeProvider } from 'styled-components/macro';
import Routes from './Routes';
import theme from './ThemeProvider/Theme';
import GlobalStyle from './GlobalStyle';

const App = () => {
    useLoadUser();
    return (
        <ThemeProvider theme={theme('primary')}>
            <GlobalStyle />
            <Routes />
        </ThemeProvider>
    );
};

export default App;
