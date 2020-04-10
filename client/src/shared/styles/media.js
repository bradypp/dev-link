import { css } from 'styled-components/macro';

const sizes = {
    bp1800: 1800,
    bp1200: 1200,
    bp1000: 1000,
    bp800: 800,
    bp600: 600,
    bp450: 450,
};

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 16;
    acc[label] = (...args) => css`
        @media (max-width: ${emSize}em) {
            ${css(...args)};
        }
    `;
    return acc;
}, {});

export default media;
