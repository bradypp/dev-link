import React from 'react';
import { useLoadUser } from 'shared/hooks';
import ThemeProvider from './ThemeProvider';
import Routes from './Routes';
import GlobalStyles from './GlobalStyles';
import NormalizeStyles from './NormalizeStyles';
import { ErrorBoundary } from 'shared/components';

const App = () => {
    useLoadUser();
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <NormalizeStyles />
                <GlobalStyles />
                <Routes />
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
