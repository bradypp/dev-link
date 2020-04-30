import React from 'react';
import { ThemeProvider as Theme } from 'styled-components/macro';

const ThemeProvider = ({ children }) => {
    const baseColors = {
        primary: '#2977c9',
        primaryDark: '#105EB0',
        primaryLight: '#4391E3',
        primaryLighter: '#d4e4f7',
        secondary: '#283e4a',
        success: '#0B875B',
        danger: '#E13C3C',
        warning: '#F89C1C',
        white1: '#f4f5f7',
        white2: '#ebecf0',
        white3: '#dfe1e6',
        white4: '#d4d7dd',
        greyDark1: '#333',
        greyDark2: '#555',
        greyDark3: '#777',
        greyDark4: '#8993a4',
        greyLight1: '#e7e4e4',
        greyLight2: '#ddd',
        greyLight3: '#ccc',
        borderFocus: '#4c9aff',
        textLink: '#0052cc',
        overlay: 'rgba(9, 30, 66, 0.54)',
        activeBackground: '#d2e5fe',
        successBackground: '#e4fcef',
    };

    const textColors = {
        textPrimary1: baseColors.greyDark1,
        textPrimary2: baseColors.greyDark2,
        textPrimary3: baseColors.greyDark3,
        textPrimary4: baseColors.greyDark3,
        textSecondary1: baseColors.white1,
        textSecondary2: baseColors.white2,
        textSecondary3: baseColors.white3,
        textColored1: baseColors.primary,
    };

    const backgroundColors = {
        background1: baseColors.white1,
        background2: baseColors.white2,
        background3: baseColors.white3,
    };

    const borderColors = {
        border1: baseColors.white2,
        border2: baseColors.white3,
        border3: baseColors.white4,
    };

    const formColors = {
        borderFocus: baseColors.primaryLight,
        fieldBackground: '#f0f2f4',
        fieldBorder: borderColors.border3,
        fieldText: textColors.textPrimary,
    };

    const theme = {
        colors: {
            ...baseColors,
            ...textColors,
            ...backgroundColors,
            ...borderColors,
            ...formColors,
        },
        fonts: {
            primary: 'Inter, Open Sans, Arial, system, -apple-system, sans-serif',
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
            tagGap: `1.6rem`,
            buttonGap: `1.6rem`,
        },
        form: {
            fontSize: `1.5rem`,
            fieldGap: `2rem`,
            fieldBorderRadius: `0.3rem`,
        },
        boxShadow: {
            medium: `0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)`,
            header: `0 0.15rem 0.5rem rgba(9, 30, 66, 0.15)`,
            primary: `0 0.15rem 0.35rem rgba(9, 30, 66, 0.25)`,
            dropdown: `0 0.4rem 0.8rem -0.2rem rgba(9, 30, 66, 0.25), 0 0 0.1rem rgba(9, 30, 66, 0.31)`,
            cover: `0 0 1rem rgba(0, 0, 0, 0.3)`,
        },
    };

    return <Theme theme={theme}>{children}</Theme>;
};

export default ThemeProvider;
