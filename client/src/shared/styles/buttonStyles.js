import { css } from 'styled-components/macro';

export const sharedButtonStyles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    white-space: nowrap;
    appearance: none;
    overflow: hidden;
    position: relative;

    &:disabled {
        opacity: 0.7;
        cursor: default;
    }
`;

export default sharedButtonStyles;
