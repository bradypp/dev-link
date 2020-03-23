import styled, { css } from 'styled-components/macro';
import { Spinner } from 'components/shared';

const darkButtonColor = css`
    color: #fff;
    background: ${({ theme, variant }) => theme.colors.button[variant]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme, variant }) =>
                theme.mixins.lighten(theme.colors.button[variant], 0.15)};
        }
        &:active {
            background: ${({ theme, variant }) =>
                theme.mixins.darken(theme.colors.button[variant], 0.1)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                background: ${({ theme, variant }) =>
                    theme.mixins.darken(theme.colors.button[variant], 0.1)} !important;
            `}
    }
`;

const lightButtonColor = css`
    color: ${({ theme }) => theme.colors.text.dark};
    background: ${({ theme, variant }) => theme.colors.button[variant]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme, variant }) =>
                theme.mixins.darken(theme.colors.button[variant], 0.15)};
        }
        &:active {
            color: ${({ theme }) => theme.colors.primary};
            background: ${({ theme, variant }) =>
                theme.mixins.lighten(theme.colors.button[variant], 0.1)};
        }
        ${({ isActive }) =>
            isActive &&
            css`
                color: ${({ theme }) => theme.colors.primary};
                background: ${({ theme, variant }) =>
                    theme.mixins.lighten(theme.colors.button[variant], 0.1)} !important;
            `}
    }
`;

const buttonVariants = {
    primary: darkButtonColor,
    success: darkButtonColor,
    danger: darkButtonColor,
    secondary: lightButtonColor,
    empty: lightButtonColor,
};

export const StyledSpinner = styled(Spinner)`
    position: relative;
    top: 1px;
`;

export const Text = styled.div`
    padding-left: ${({ withPadding }) => (withPadding ? 7 : 0)}px;
`;

export const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    vertical-align: middle;
    line-height: 1;
    padding: 0 ${({ iconOnly }) => (iconOnly ? 10 : 15)}px;
    white-space: nowrap;
    border-radius: 3px;
    transition: ${({ theme }) => theme.animation.transition};
    appearance: none;
    font-size: ${({ theme }) => theme.fontSize.base};
    ${({ variant }) => buttonVariants[variant]}

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
