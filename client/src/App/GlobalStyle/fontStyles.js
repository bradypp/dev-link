import { css } from 'styled-components/macro';

const fontStyles = css`
    @font-face {
        font-family: 'Lato';
        src: url('fonts/Lato-Regular.woff2') format('woff2'),
            url('fonts/Lato-Regular.woff') format('woff'),
            url('fonts/Lato-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'Lato';
        src: url('fonts/Lato-Light.woff2') format('woff2'),
            url('fonts/Lato-Light.woff') format('woff'),
            url('fonts/Lato-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Lato';
        src: url('fonts/Lato-Bold.woff2') format('woff2'),
            url('fonts/Lato-Bold.woff') format('woff'),
            url('fonts/Lato-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
    }
`;

export default fontStyles;
