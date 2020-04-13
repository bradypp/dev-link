import styled, { css } from 'styled-components/macro';
import { Spinner } from 'shared/components';
import { mixins, sharedButtonStyles } from 'shared/styles';
import { simpleLinkStyles } from 'shared/components/CustomLink/CustomLinkStyles';
import ButtonWrapper from './ButtonWrapper';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export const ButtonSpinner = styled(Spinner).attrs({
    overlayActive: false,
    variant: 'button',
    size: '1.8rem',
})``;

const height = css`
    ${({ iconOnly }) => (iconOnly ? `2.8rem` : `3.6rem`)}
`;

export const baseButtonStyles = css`
    ${sharedButtonStyles}
    color: ${({ theme }) => theme.colors.textPrimary1};
    font-weight: 600;
    height: ${height};
    width: ${({ iconOnly }) => iconOnly && `${height}`};
    padding: 0 ${({ iconOnly }) => (iconOnly ? `0` : `1.6rem`)};
    border-radius: 0.2rem;
`;

const primaryTextColors = css`
    color: ${({ theme, textColor, backgroundColor }) => {
        if (textColor) return theme.colors[textColor];
        switch (backgroundColor) {
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

const primaryBackgroundBehaviour = (lightenOnHover = true) => css`
    background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    &:not(:disabled) {
        &:hover {
            background-color: ${({ theme, backgroundColor, lightenDarkenPercentage }) =>
                lightenOnHover
                    ? mixins.lighten(theme.colors[backgroundColor], lightenDarkenPercentage)
                    : mixins.darken(theme.colors[backgroundColor], lightenDarkenPercentage)};
        }
        &:active {
            background-color: ${({ theme, backgroundColor, lightenDarkenPercentage }) =>
                lightenOnHover
                    ? mixins.darken(theme.colors[backgroundColor], lightenDarkenPercentage / 2)
                    : mixins.lighten(theme.colors[backgroundColor], lightenDarkenPercentage / 2)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background-color: ${({ theme, backgroundColor, lightenDarkenPercentage }) =>
                    lightenOnHover
                        ? mixins.darken(theme.colors[backgroundColor], lightenDarkenPercentage / 2)
                        : mixins.lighten(
                              theme.colors[backgroundColor],
                              lightenDarkenPercentage / 2,
                          )} !important;
            `}
    }
`;

const primaryBackgroundColors = css`
    ${({ backgroundColor }) => {
        switch (backgroundColor) {
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

export const primaryButtonStyles = css`
    ${sharedButtonStyles}
    ${baseButtonStyles}
    ${primaryTextColors}
    ${primaryBackgroundColors}
`;

export const borderedButtonStyles = css`
    ${sharedButtonStyles}
    ${baseButtonStyles}
    color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    border: 1px solid ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    &:not(:disabled) {
            &:hover {
                box-shadow: inset 0 0 0 0.1rem ${({ theme, backgroundColor }) =>
                    theme.colors[backgroundColor]};
                background-color: ${({ theme, backgroundColor }) =>
                    mixins.rgba(theme.colors[backgroundColor], 0.05)};
            }
            &:active {
                box-shadow: inset 0 0 0 0.1rem ${({ theme, backgroundColor }) =>
                    theme.colors[backgroundColor]};
                background-color: ${({ theme, backgroundColor }) =>
                    mixins.rgba(theme.colors[backgroundColor], 0.05)};
            }
            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 0.1rem
                        ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
                    background-color: ${({ theme, backgroundColor }) =>
                        mixins.rgba(theme.colors[backgroundColor], 0.05)};
                `}
    }
`;

export const StyledButton = styled(ButtonWrapper)`
    ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return primaryButtonStyles;
            case 'bordered':
                return borderedButtonStyles;
            case 'link':
                return simpleLinkStyles;
            case 'base':
                return baseButtonStyles;
            case 'no-styles':
            default:
                return sharedButtonStyles;
        }
    }}
`;
