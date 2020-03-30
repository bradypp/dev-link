import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import theme from './Theme';

export default ({ children }) => <ThemeProvider theme={theme()}>{children}</ThemeProvider>;
