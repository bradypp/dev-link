import styled, { css } from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 7 : 0)}px;
`;

export const baseButtonStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    vertical-align: middle;
    line-height: 1;
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

export const primaryButtonStyles = css`
    color: ${({ theme, color }) => {
        if (color === 'primary' || color === 'success' || color === 'danger') {
            return theme.colors.white;
        }
        return theme.colors.dark;
    }};
    background: ${({ theme, color }) => theme.colors.button[color]};
    &:not(:disabled) {
        &:hover {
            background: ${({ theme, color }) => mixins.darken(theme.colors.button[color], 0.1)};
        }

        &:active {
            background: ${({ theme, color }) => mixins.lighten(theme.colors.button[color], 0.1)};
        }

        ${({ isActive }) =>
            isActive &&
            css`
                background: ${({ theme, color }) =>
                    mixins.lighten(theme.colors.button[color], 0.1)} !important;
            `}
    }
`;

export const borderedButtonStyles = css`
    color: ${({ theme, color }) => theme.colors.button[color]};
    background: ${({ theme }) => theme.colors.button.white};
    border: 3px solid ${({ theme, color }) => theme.colors.button[color]};
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
