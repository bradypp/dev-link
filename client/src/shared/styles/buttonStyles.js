import { css } from 'styled-components/macro';

export const sharedButtonStyles = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    outline: none;
    vertical-align: middle;
    white-space: nowrap;
    appearance: none;
    overflow: hidden;
    position: relative;
    width: min-content;
    color: ${({ theme, textColor }) => theme.colors[textColor] || theme.colors.greyDark1};

    &:disabled {
        opacity: 0.7;
        cursor: default;
    }
`;

export default sharedButtonStyles;
