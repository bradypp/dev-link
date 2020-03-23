import { css } from 'styled-components/macro';

export const buttonText = () => css`
    padding-left: ${({ withPadding }) => (withPadding ? 7 : 0)}px;
`;

export const baseButtonStyles = () => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    vertical-align: middle;
    line-height: 1;
    padding: 0 ${({ iconOnly }) => (iconOnly ? 1 : 1.5)}rem;
    white-space: nowrap;
    transition: ${({ theme }) => theme.animation.transition};
    appearance: none;
    font-size: ${({ theme }) => theme.fontSize.base};
    border-radius: 0.3rem;
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;

export const defaultButtonStyles = () => css`
    color: ${({ theme, variant }) => {
        if (variant === 'primary' || variant === 'success' || variant === 'danger') {
            return theme.colors.white;
        }
        return theme.colors.dark;
    }};
    background: ${({ theme, variant }) => theme.colors.button[variant]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme, variant }) =>
                theme.mixins.darken(theme.colors.button[variant], 0.1)};
        }

        &:active {
            background: ${({ theme, variant }) =>
                theme.mixins.lighten(theme.colors.button[variant], 0.1)};
        }

        ${({ isActive }) =>
            isActive &&
            css`
                background: ${({ theme, variant }) =>
                    theme.mixins.lighten(theme.colors.button[variant], 0.1)} !important;
            `}
    }
`;

// TODO: Add border and colors
export const borderedButtonStyles = () => css`
    color: ${({ theme, variant }) => theme.colors.button[variant]};
    background: ${({ theme }) => theme.colors.button.white};
    border: 3px solid ${({ theme, variant }) => theme.colors.button[variant]};
    &:not(:disabled) {
        &:not(:disabled) {
            &:hover {
                background: ${({ theme }) => theme.colors.button.grey};
            }

            &:active {
                background: ${({ theme }) => theme.colors.button.white};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    background: #fff !important;
                `}
        }
    }
`;

export const buttonStyles = () => css`
    ${baseButtonStyles}
    ${({ styles }) =>
        (styles === 'default' && defaultButtonStyles) ||
        (styles === 'bordered' && borderedButtonStyles)}
`;
