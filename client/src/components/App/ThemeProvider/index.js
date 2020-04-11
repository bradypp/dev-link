import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { themes } from 'shared/constants';
import theme from './Theme';

export default ({ children }) => (
    <ThemeProvider theme={theme(themes.LIGHT)}>{children}</ThemeProvider>
);
