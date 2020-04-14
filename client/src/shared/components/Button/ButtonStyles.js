import styled, { css } from 'styled-components/macro';
import { Spinner } from 'shared/components';
import { mixins } from 'shared/styles';
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

const baseButtonStyles = css`
    ${mixins.button};
    color: ${({ theme, textColor, backgroundColor }) => {
        if (textColor) return theme.colors[textColor];
        switch (backgroundColor) {
            case 'buttonPrimary':
            case 'buttonDanger':
                return theme.colors.white1;
            default:
                return theme.colors.textPrimary1;
        }
    }};
    font-weight: 600;
    height: ${height};
    width: ${({ iconOnly }) => iconOnly && `${height}`};
    padding: ${({ iconOnly }) => (iconOnly ? `0` : `0 1.6rem`)};
    border-radius: 0.2rem;
`;

// TODO: convert the || statements to switch statements & allow none for button behaviour with no on hover etc.?
const primaryButtonStyles = css`
    ${baseButtonStyles}
    background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    &:not(:disabled) {
        &:hover {
            background-color: ${({
                theme,
                backgroundColor,
                buttonBehaviour,
                lightenDarkenPercentage,
            }) =>
                (buttonBehaviour === 'default' &&
                    mixins.darken(theme.colors[backgroundColor], lightenDarkenPercentage)) ||
                (buttonBehaviour === 'lighten' &&
                    mixins.lighten(theme.colors[backgroundColor], lightenDarkenPercentage))};
        }
        &:active {
            background-color: ${({ theme, backgroundColor, buttonBehaviour }) =>
                (buttonBehaviour === 'default' && theme.colors[backgroundColor]) ||
                (buttonBehaviour === 'lighten' && theme.colors[backgroundColor])};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background-color: ${({ theme, backgroundColor, buttonBehaviour }) =>
                    (buttonBehaviour === 'default' && theme.colors[backgroundColor]) ||
                    (buttonBehaviour === 'lighten' && theme.colors[backgroundColor])} !important;
            `}
    }
`;

const borderedButtonStyles = css`
    ${baseButtonStyles}
    color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    border: 1px solid ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    &:not(:disabled) {
            &:hover {
                ${({ theme, backgroundColor, buttonBehaviour, lightenDarkenPercentage }) =>
                    (buttonBehaviour === 'default' &&
                        css`
                            color: ${theme.colors.white1};
                            background-color: ${mixins.darken(
                                theme.colors[backgroundColor],
                                lightenDarkenPercentage,
                            )};
                        `) ||
                    (buttonBehaviour === 'inset' &&
                        css`
                            box-shadow: inset 0 0 0 0.1rem ${theme.colors[backgroundColor]};
                            background-color: ${mixins.rgba(theme.colors[backgroundColor], 0.05)};
                        `) ||
                    (buttonBehaviour === 'lighten' &&
                        css`
                            color: ${theme.colors.white1};
                            background-color: ${mixins.lighten(
                                theme.colors[backgroundColor],
                                lightenDarkenPercentage,
                            )};
                        `)}
            }
            &:active {
                ${({ theme, backgroundColor, buttonBehaviour }) =>
                    (buttonBehaviour === 'default' &&
                        css`
                            color: ${theme.colors.white1};
                            background-color: ${theme.colors[backgroundColor]};
                        `) ||
                    (buttonBehaviour === 'inset' &&
                        css`
                            box-shadow: inset 0 0 0 0.1rem ${theme.colors[backgroundColor]};
                            background-color: ${mixins.rgba(theme.colors[backgroundColor], 0.1)};
                        `) ||
                    (buttonBehaviour === 'lighten' &&
                        css`
                            color: ${theme.colors.white1};
                            background-color: ${theme.colors[backgroundColor]};
                        `)}
            }
            ${({ isActive, theme, backgroundColor, buttonBehaviour }) =>
                isActive
                    ? (buttonBehaviour === 'default' &&
                          css`
                              color: ${theme.colors.white1} !important;
                              background-color: ${theme.colors[backgroundColor]} !important;
                          `) ||
                      (buttonBehaviour === 'inset' &&
                          css`
                              box-shadow: inset 0 0 0 0.1rem ${theme.colors[backgroundColor]} !important;
                              background-color: ${mixins.rgba(
                                  theme.colors[backgroundColor],
                                  0.1,
                              )} !important;
                          `) ||
                      (buttonBehaviour === 'lighten' &&
                          css`
                              color: ${theme.colors.white1} !important;
                              background-color: ${theme.colors[backgroundColor]} !important;
                          `)
                    : ''};
    }       
`;

export const buttonStyles = css`
    ${({ variant }) => {
        switch (variant) {
            case 'bordered':
                return borderedButtonStyles;
            case 'base':
                return baseButtonStyles;
            case 'no-styles':
                return mixins.button;
            case 'link': {
                return mixins.link;
            }
            default:
                return primaryButtonStyles;
        }
    }}
`;

export const StyledButton = styled(ButtonWrapper)`
    ${buttonStyles}
`;
