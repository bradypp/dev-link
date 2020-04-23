import { themes } from 'shared/constants';

const base = {
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

const light = {
    textPrimary1: base.greyDark1,
    textPrimary2: base.greyDark2,
    textPrimary3: base.greyDark3,
    textSecondary1: base.white1,
    textSecondary2: base.white2,
    textSecondary3: base.white3,
    textColored1: base.primary,
    background1: base.white1,
    background2: base.white2,
    background3: base.white3,
    border1: base.greyLight2,
    border2: base.greyLight3,
};

// TODO: customize dark theme
const dark = {
    textPrimary1: base.white1,
    textPrimary2: base.white2,
    textPrimary3: base.white3,
    textSecondary1: base.greyDark1,
    textSecondary2: base.greyDark2,
    textSecondary3: base.greyDark3,
    textColored1: base.primary,
    background1: base.greyDark1,
    background2: base.greyDark2,
    background3: base.greyDark3,
    border1: base.greyDark3,
    border2: base.greyDark2,
};

const selectTheme = theme => {
    switch (theme) {
        case themes.DARK:
            return dark;
        case themes.LIGHT:
        default:
            return light;
    }
};

const colors = theme => ({
    ...base,
    ...selectTheme(theme),
});

export default colors;
