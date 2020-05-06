import { css } from 'styled-components/macro';
import helpers from './helpers';

const components = {
    button: css`
        cursor: pointer;
        background: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        white-space: nowrap;
        appearance: none;
        overflow: hidden;
        position: relative;
        width: min-content;
        appearance: none;
        line-height: 1;
    `,
    card: css`
        border-radius: 0.3rem;
        box-shadow: ${({ theme }) => theme.boxShadow.primary};
        background: ${({ theme }) => theme.colors.background1};
        padding: ${({ theme }) => theme.layout.cardPadding};
        width: 100%;
    `,
    link: css`
        cursor: pointer;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.textLink};

        &:hover,
        &:visited,
        &:active {
            color: ${({ theme }) => helpers.lighten(theme.colors.textLink, 0.1)};
        }

        &:hover {
            text-decoration: underline;
        }
    `,
};

export default components;
