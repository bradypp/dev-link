import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export const baseButtonStyles = css`
    ${mixins.inlineFlexCenter}
    color: ${({ theme }) => theme.colors.textPrimary1};
    vertical-align: middle;
    white-space: nowrap;
    appearance: none;
    font-weight: 600;
    height: 4rem;
    overflow: hidden;
    padding: 0 ${({ iconOnly }) => (!iconOnly ? `1.8rem` : `2.2rem`)};
    width: min-content;
    border-radius: 0.2rem;

    &:disabled {
        opacity: 0.7;
        cursor: default;

        span {
            opacity: 0;
        }
    }
`;

// TODO: put box shadow on buttons
const lightenDarkenPercentage = 0.05;

export const primaryButtonStyles = (color = 'primary') => css`
    color: ${({ theme }) => {
        switch (color) {
            case 'primary':
            case 'primaryDark':
            case 'primaryLight':
            case 'danger':
                return theme.colors.white1;
            default:
                return theme.colors.greyDark1;
        }
    }};
    background: ${({ theme }) => theme.colors[color]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme }) =>
                mixins.darken(theme.colors[color], lightenDarkenPercentage)};
        }
        &:active {
            background: ${({ theme }) =>
                mixins.lighten(theme.colors[color], lightenDarkenPercentage)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background: ${({ theme }) =>
                    mixins.lighten(theme.colors[color], lightenDarkenPercentage)} !important;
            `}
    }
`;

// TODO: move to header styles if only used there
const borderedButtonActiveBackground = color => css`
    background: ${({ theme }) => mixins.rgba(theme.colors[color], 0.05)};
`;

export const borderedButtonStyles = (color = 'primary') => css`
    color: ${({ theme }) => theme.colors[color]};
    background: ${({ theme }) => theme.colors.white1};
    border: 1px solid ${({ theme }) => theme.colors[color]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                ${borderedButtonActiveBackground(color)};
            }
            &:active {
                box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                ${borderedButtonActiveBackground(color)};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                    ${borderedButtonActiveBackground(color)};
                `}
        }
    }
`;
