import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 7 : 0)}px;
`;

export const baseButtonStyles = css`
    ${mixins.flexCenter}
    vertical-align: middle;
    white-space: nowrap;
    transition: all 0.15s ease;
    appearance: none;
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: 600;
    height: 4rem;
    line-height: 4rem;
    overflow: hidden;
    padding: 0 ${({ iconOnly }) => (iconOnly ? 1 : 2.2)}rem;
    border-radius: 0.2rem;
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;

const primaryLightenDarkenPercentage = 0.05;

export const primaryButtonStyles = (color = 'primary') => css`
    ${baseButtonStyles};
    color: ${({ theme }) => {
        switch (color) {
            case 'primary':
            case 'primaryDark':
            case 'primaryLight':
            case 'danger':
                return theme.colors.white;
            default:
                return theme.colors.greyDark1;
        }
    }};
    background: ${({ theme }) => theme.colors[color]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme }) =>
                mixins.darken(theme.colors[color], primaryLightenDarkenPercentage)};
        }
        &:active {
            background: ${({ theme }) =>
                mixins.lighten(theme.colors[color], primaryLightenDarkenPercentage)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background: ${({ theme }) =>
                    mixins.lighten(theme.colors[color], primaryLightenDarkenPercentage)} !important;
            `}
    }
`;

const secondaryOnHoverBackground = color => css`
    background: ${({ theme }) => mixins.rgba(theme.colors[color], 0.75)};
`;

export const secondaryButtonStyles = (color = 'primary') => css`
    ${baseButtonStyles};
    ${primaryButtonStyles(color)};
    background: ${({ theme }) => mixins.rgba(theme.colors[color], 0.7)};
    &:not(:disabled) {
        &:hover {
            ${secondaryOnHoverBackground(color)};
        }

        &:active {
            ${secondaryOnHoverBackground(color)};
        }

        ${({ isActive }) =>
            isActive &&
            css`
                ${secondaryOnHoverBackground(color)} !important;
            `}
    }
`;

const borderedButtonActiveBackground = color => css`
    background: ${({ theme }) => mixins.rgba(theme.colors[color], 0.05)};
`;

export const borderedButtonStyles = (color = 'primary') => css`
    ${baseButtonStyles};
    color: ${({ theme }) => theme.colors[color]};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors[color]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                box-shadow: inset 0 0 0 0.1rem ${({ theme }) => theme.colors[color]};
                ${borderedButtonActiveBackground(color)};
            }
            &:active {
                box-shadow: inset 0 0 0 0.2rem ${({ theme }) => theme.colors[color]};
                ${borderedButtonActiveBackground(color)};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 0.2rem ${({ theme }) => theme.colors[color]};
                    ${borderedButtonActiveBackground(color)};
                `}
        }
    }
`;
