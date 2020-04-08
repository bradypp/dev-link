const utils = {
    rootDomain: {},
    zIndex: {
        dropdown: 50,
        modal: 100,
        alert: 150,
    },
    // TODO: media query to change padding to 1.6 for mobile
    layout: {
        maxWidth: `120rem`,
        pagePadding: `4rem`,
    },
    boxShadow: {
        medium: `0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)`,
        card: `0 0 0 0.1rem rgba(0, 0, 0, 0.15), 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2)`,
        dropdown: `rgba(9, 30, 66, 0.25) 0 0.4rem 0.8rem -0.2rem, rgba(9, 30, 66, 0.31) 0 0x 0.1rem`,
        cover: `0 0 1rem rgba(0, 0, 0, 0.3)`,
    },
};

export default utils;
