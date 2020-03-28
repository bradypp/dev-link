import { css } from 'styled-components/macro';

const fontStyles = css`
    @font-face {
        font-family: 'Lato';
        src: url('fonts/Lato/Lato-Regular.woff2') format('woff2'),
            url('fonts/Lato/Lato-Regular.woff') format('woff'),
            url('fonts/Lato/Lato-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'Lato';
        src: url('fonts/Lato/Lato-Light.woff2') format('woff2'),
            url('fonts/Lato/Lato-Light.woff') format('woff'),
            url('fonts/Lato/Lato-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Lato';
        src: url('fonts/Lato/Lato-Bold.woff2') format('woff2'),
            url('fonts/Lato/Lato-Bold.woff') format('woff'),
            url('fonts/Lato/Lato-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'Fira Code';
        src: url('fonts/FiraCode/FiraCode-Regular.woff2') format('woff2'),
            url('fonts/FiraCode/FiraCode-Regular.woff') format('woff'),
            url('fonts/FiraCode/FiraCode-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'Fira Code';
        src: url('fonts/FiraCode/FiraCode-Medium.woff2') format('woff2'),
            url('fonts/FiraCode/FiraCode-Medium.woff') format('woff'),
            url('fonts/FiraCode/FiraCode-Medium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
    }
`;

export default fontStyles;
