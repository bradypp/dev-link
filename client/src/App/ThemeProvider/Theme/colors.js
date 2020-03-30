const base = {
    primary: '#2977c9',
    primaryDark: '#105EB0',
    primaryLight: '#4391E3',
    secondary: '',
    success: '#0B875B',
    danger: '#E13C3C',
    warning: '#F89C1C',
    white: '#f4f5f7',
    greyDark1: '#333',
    greyDark2: '#555',
    greyDark3: '#777',
    greyLight1: '#e7e4e4',
    greyLight2: '#ddd',
    greyLight3: '#ccc',
};

const primary = {
    text: {
        primary: base.greyDark1,
        secondary: base.white,
        link: '#0052cc',
    },
    background: {
        primary: base.white,
    },
};

export const secondary = {
    text: {
        primary: base.white,
        secondary: base.greyDark1,
        link: '#0052cc',
    },
    background: {
        primary: base.greyDark1,
    },
};

const colors = theme => ({
    ...base,
    ...((theme === 'primary' && primary) || (theme === 'secondary' && secondary)),
});

export default colors;
