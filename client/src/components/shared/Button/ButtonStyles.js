import styled, { css } from 'styled-components/macro';
import { Spinner } from 'components/shared';

// TODO: test this works with theme & customise
const buttonColor = css`
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
    primary: buttonColor,
    success: buttonColor,
    danger: buttonColor,
    secondary: lightButtonColor,
    empty: lightButtonColor,
};

// FIXME
// export const StyledSpinner = styled(Spinner)`
//     position: relative;
//     top: 1px;
// `;

export const Text = styled.div`
    padding-left: ${props => (props.withPadding ? 7 : 0)}px;
`;

export const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    vertical-align: middle;
    line-height: 1;
    padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
    white-space: nowrap;
    border-radius: 3px;
    transition: all 0.1s;
    appearance: none;
    font-size: 1.4rem;
    ${props => buttonVariants[props.variant]}

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
