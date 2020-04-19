import { css } from 'styled-components/macro';

const components = {
    button: css`
        cursor: pointer;
        background: none;
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 1.6rem;
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
        outline: none;
        border: 0;
        border-radius: 0;
        appearance: none;

        &:focus,
        &:active {
            outline: none;
        }

        &:disabled {
            opacity: 0.7;
            cursor: default;
        }
    `,
    card: css`
        box-shadow: ${({ theme }) => theme.boxShadow.primary};
        background: ${({ theme }) => theme.colors.background1};
        padding: ${({ theme }) => theme.layout.cardPadding};
        width: 100%;
    `,
};

export default components;
