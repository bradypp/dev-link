import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { themes } from 'shared/constants';
import colors from './colors';

export default ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(themes.LIGHT);
    const theme = {
        colors: colors(currentTheme),
        fonts: {
            primary: 'Inter, Open Sans, Helvetica, Arial, system, -apple-system, sans-serif',
        },
        animation: {
            transition: `all 0.25s cubic-bezier(0.3, 0, 0.4, 1)`,
            easeCustom: `cubic-bezier(0.3, 0, 0.4, 1)`,
            easeInCubic: `cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
            easeOutCubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`,
            easeInOutCubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`,
            easeInExpo: `cubic-bezier(0.95, 0.05, 0.795, 0.035)`,
            easeOutExpo: `cubic-bezier(0.19, 1, 0.22, 1)`,
            easeInOutExpo: `cubic-bezier(0.19, 1, 0.22, 1)`,
            easeInBack: `cubic-bezier(0.6, -0.28, 0.735, 0.045)`,
            easeOutBack: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
            easeInOutBack: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
        },
        zIndex: {
            header: 50,
            dropdown: 100,
            modal: 150,
            alert: 200,
        },
        layout: {
            maxWidth: `120rem`,
            pagePadding: `4.8rem`,
            pagePaddingTablet: `3.2rem`,
            pagePaddingMobile: `1.6rem`,
            headerHeight: `6rem`,
            cardPadding: `2.4rem`,
            mainGridGap: `1.6rem`,
        },
        boxShadow: {
            medium: `0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)`,
            header: `0 0.15rem 0.5rem rgba(9, 30, 66, 0.15)`,
            primary: `0 0.15rem 0.35rem rgba(9, 30, 66, 0.25)`,
            dropdown: `0 0.4rem 0.8rem -0.2rem rgba(9, 30, 66, 0.25),  0 0 0.1rem rgba(9, 30, 66, 0.31)`,
            cover: `0 0 1rem rgba(0, 0, 0, 0.3)`,
        },
    };
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
