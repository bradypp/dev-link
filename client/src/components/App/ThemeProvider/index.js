import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { themes } from 'shared/constants';
import animation from './animation';
import colors from './colors';
import typography from './typography';
import utils from './utils';

export default ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(themes.LIGHT);
    const theme = {
        colors: colors(currentTheme),
        animation,
        ...typography,
        ...utils,
        theme,
    };
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
