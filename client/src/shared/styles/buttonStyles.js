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
    font-size: ${({ theme }) => theme.fontSize.base};
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

export const primaryButtonStyles = (customColor = undefined) => css`
    ${baseButtonStyles};
    color: ${({ theme, color }) => {
        if (color === 'primary' || color === 'success' || color === 'danger') {
            return theme.colors.white;
        }
        return theme.colors.greyDark1;
    }};
    background: ${({ theme, color }) =>
        customColor !== undefined ? theme.colors.customColor : theme.colors[color]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme, color }) =>
                customColor
                    ? mixins.darken(theme.colors.customColor, primaryLightenDarkenPercentage)
                    : mixins.darken(theme.colors[color], primaryLightenDarkenPercentage)};
        }
        &:active {
            background: ${({ theme, color }) =>
                mixins.lighten(theme.colors[color], primaryLightenDarkenPercentage)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background: ${({ theme, color }) =>
                    mixins.lighten(theme.colors[color], primaryLightenDarkenPercentage)} !important;
            `}
    }
`;

const secondaryInsetBoxShadow = css`
    box-shadow: inset 0 0 0 1px ${({ theme, color }) => theme.colors[color]};
`;
const secondaryBackground = css`
    background: ${({ theme, color }) => mixins.rgba(theme.colors[color], 0.05)};
`;

export const secondaryButtonStyles = css`
    ${baseButtonStyles};
    color: ${({ theme, color }) => theme.colors[color]};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme, color }) => theme.colors[color]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                ${secondaryInsetBoxShadow};
                ${secondaryBackground};
            }
            &:active {
                ${secondaryInsetBoxShadow};
                ${secondaryBackground};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    ${secondaryInsetBoxShadow};
                    ${secondaryBackground} !important;
                `}
        }
    }
`;

const tertiaryOnHoverBackground = css`
    background: ${({ theme, color }) => mixins.rgba(theme.colors[color], 0.75)};
`;
export const tertiaryButtonStyles = css`
    ${baseButtonStyles};
    ${primaryButtonStyles};
    background: ${({ theme, color }) => mixins.rgba(theme.colors[color], 0.7)};
    &:not(:disabled) {
        &:hover {
            ${tertiaryOnHoverBackground};
        }

        &:active {
            ${tertiaryOnHoverBackground};
        }

        ${({ isActive }) =>
            isActive &&
            css`
                ${tertiaryOnHoverBackground} !important;
            `}
    }
`;
