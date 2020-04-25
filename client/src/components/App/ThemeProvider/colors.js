import { themes } from 'shared/constants';

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
    white2: '#edeff2',
    white3: '#e7eaee',
    greyDark1: '#333',
    greyDark2: '#555',
    greyDark3: '#777',
    greyLight1: '#e7e4e4',
    greyLight2: '#ddd',
    greyLight3: '#ccc',
    borderFocus: '#4c9aff',
    textLink: '#0052cc',
    overlay: 'rgba(9, 30, 66, 0.54)',
};

const lightTheme = {
    textPrimary1: baseColors.greyDark1,
    textPrimary2: baseColors.greyDark2,
    textPrimary3: baseColors.greyDark3,
    textSecondary1: baseColors.white1,
    textSecondary2: baseColors.white2,
    textSecondary3: baseColors.white3,
    textColored1: baseColors.primary,
    background1: baseColors.white1,
    background2: baseColors.white2,
    background3: baseColors.white3,
    border1: baseColors.greyLight2,
    border2: baseColors.greyLight3,
};

// TODO: customize dark theme
const darkTheme = {
    textPrimary1: baseColors.white1,
    textPrimary2: baseColors.white2,
    textPrimary3: baseColors.white3,
    textSecondary1: baseColors.greyDark1,
    textSecondary2: baseColors.greyDark2,
    textSecondary3: baseColors.greyDark3,
    textColored1: baseColors.primary,
    background1: baseColors.greyDark1,
    background2: baseColors.greyDark2,
    background3: baseColors.greyDark3,
    border1: baseColors.greyDark3,
    border2: baseColors.greyDark2,
};

const getTheme = theme => {
    switch (theme) {
        case themes.DARK:
            return darkTheme;
        case themes.LIGHT:
        default:
            return lightTheme;
    }
};

export default theme => ({
    ...baseColors,
    ...getTheme(theme),
});
