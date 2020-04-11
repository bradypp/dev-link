import styled, { css } from 'styled-components/macro';
import { Spinner } from 'shared/components';
import { mixins, sharedButtonStyles } from 'shared/styles';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export const ButtonSpinner = styled(Spinner).attrs({
    overlayActive: false,
    variant: 'button',
    size: '1.8rem',
})``;

export const baseButtonStyles = css`
    color: ${({ theme }) => theme.colors.textPrimary1};
    font-weight: 600;
    height: 3.6rem;
    padding: 0 ${({ iconOnly }) => (!iconOnly ? `1.6rem` : `2rem`)};
    width: min-content;
    border-radius: 0.2rem;
`;

const primaryBackgroundBehaviour = (lightenOnHover = true) => css`
    background-color: ${({ theme, color }) => theme.colors[color]};
    &:not(:disabled) {
        &:hover {
            background-color: ${({ theme, color, lightenDarkenPercentage }) =>
                lightenOnHover
                    ? mixins.lighten(theme.colors[color], lightenDarkenPercentage)
                    : mixins.darken(theme.colors[color], lightenDarkenPercentage)};
        }
        &:active {
            background-color: ${({ theme, color, lightenDarkenPercentage }) =>
                lightenOnHover
                    ? mixins.darken(theme.colors[color], lightenDarkenPercentage / 2)
                    : mixins.lighten(theme.colors[color], lightenDarkenPercentage / 2)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background-color: ${({ theme, color, lightenDarkenPercentage }) =>
                    lightenOnHover
                        ? mixins.darken(theme.colors[color], lightenDarkenPercentage / 2)
                        : mixins.lighten(
                              theme.colors[color],
                              lightenDarkenPercentage / 2,
                          )} !important;
            `}
    }
`;

const primaryBackgroundColors = css`
    ${({ color }) => {
        switch (color) {
            case 'primary':
            case 'primaryDark':
            case 'primaryLight':
            case 'secondary':
            case 'danger':
                return primaryBackgroundBehaviour(true);
            default:
                return primaryBackgroundBehaviour(false);
        }
    }}
`;

const primaryTextColors = css`
    color: ${({ theme, color }) => {
        switch (color) {
            case 'primary':
            case 'primaryDark':
            case 'primaryLight':
            case 'secondary':
            case 'danger':
                return theme.colors.white1;
            default:
                return theme.colors.greyDark1;
        }
    }};
`;

export const primaryButtonStyles = css`
    ${baseButtonStyles}
    ${primaryTextColors}
    ${primaryBackgroundColors}
`;

export const borderedButtonStyles = css`
    ${baseButtonStyles}
    color: ${({ theme, color }) => theme.colors[color]};
    border: 1px solid ${({ theme, color }) => theme.colors[color]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                box-shadow: inset 0 0 0 0.1rem ${({ theme, color }) => theme.colors[color]};
                background-color: ${({ theme, color }) => mixins.rgba(theme.colors[color], 0.05)};
            }
            &:active {
                box-shadow: inset 0 0 0 0.1rem ${({ theme, color }) => theme.colors[color]};
                background-color: ${({ theme, color }) => mixins.rgba(theme.colors[color], 0.05)};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 0.1rem ${({ theme, color }) => theme.colors[color]};
                    background-color: ${({ theme, color }) =>
                        mixins.rgba(theme.colors[color], 0.05)};
                `}
        }
    }
`;

export const StyledButton = styled.button`
    ${sharedButtonStyles}
    ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return primaryButtonStyles;
            case 'bordered':
                return borderedButtonStyles;
            default:
                return baseButtonStyles;
        }
    }}
`;
