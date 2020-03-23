import React from 'react';
import { useLoadUser } from 'shared/utils';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';
import GlobalStyle from './GlobalStyle';

// TODO: Delete the following line and the styles folder when done
import 'styles/old/app.scss';

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
