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
    // TODO: create a tag component?
    tag: css`
        display: inline-flex;
        align-items: center;
        height: 2.4rem;
        padding: 0 0.8rem;
        border-radius: 0.4rem;
        cursor: pointer;
        user-select: none;
        color: ${({ theme }) => theme.colors.textPrimary1};
        background-color: ${({ theme }) => theme.colors.background3};
        font-weight: 500;
        font-size: 1.2rem;
    `,
    fieldStyling: css`
        width: 100%;
        font-family: ${({ theme }) => theme.fonts.primary};
        border-radius: ${({ theme }) => theme.form.fieldBorderRadius};
        border: 1px solid ${({ theme }) => theme.colors.fieldBorder};
        color: ${({ theme }) => theme.colors.fieldText};
        background-color: ${({ theme }) => theme.colors.fieldBackground};
        font-size: ${({ theme }) => theme.form.fontSize};
    `,
    fieldSubtitle: css`
        padding-top: 0.6rem;
        font-size: 1.2rem;
        line-height: 1;
        font-weight: 400;
    `,
};

export default components;
