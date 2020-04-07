import { themes } from 'shared/constants';

const base = {
    primary: '#2977c9',
    primaryDark: '#105EB0',
    primaryLight: '#4391E3',
    secondary: '',
    success: '#0B875B',
    danger: '#E13C3C',
    warning: '#F89C1C',
    white1: '#f4f5f7',
    white2: '#ebecf0',
    white3: '#dfe1e6',
    greyDark1: '#333',
    greyDark2: '#555',
    greyDark3: '#777',
    greyLight1: '#e7e4e4',
    greyLight2: '#ddd',
    greyLight3: '#ccc',
    link: '#0052cc',
    border1: '#dfe1e6',
    border2: '#C1C7D0',
    borderInputFocus: '#4c9aff',
};

const light = {
    textPrimary1: base.greyDark1,
    textPrimary2: base.greyDark2,
    textPrimary3: base.greyDark3,
    textSecondary1: base.white1,
    textSecondary2: base.white2,
    textSecondary3: base.white3,
    background1: base.white1,
    background2: base.white2,
    background3: base.white3,
};

// TODO: customize dark theme
const dark = {
    textPrimary1: base.white1,
    textPrimary2: base.white2,
    textPrimary3: base.white3,
    textSecondary1: base.greyDark1,
    textSecondary2: base.greyDark2,
    textSecondary3: base.greyDark3,
    text1: base.white1,
    text2: base.greyDark1,
    background1: base.greyDark1,
    background2: base.greyDark2,
    background3: base.greyDark3,
};

const colors = theme => ({
    ...base,
    ...((theme === themes.LIGHT && light) || (theme === themes.DARK && dark)),
});

export default colors;
