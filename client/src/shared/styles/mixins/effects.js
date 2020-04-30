import { css } from 'styled-components/macro';
import helpers from './helpers';

// TODO: test the effects helpers
const effects = {
    hoverEffect: (
        config = {
            backgroundColor: null,
            color: null,
            borderColor: null,
            boxShadow: null,
        },
    ) => {
        const { backgroundColor, color, borderColor, boxShadow } = config;
        return css`
            &:not(:disabled) {
                &:hover {
                    ${color && `color: ${color}`};
                    ${backgroundColor && `background-color: ${backgroundColor}`};
                    ${borderColor && `border-color: ${borderColor}`};
                    ${boxShadow && `box-shadow: ${boxShadow}`};
                }
            }
        `;
    },
    activeEffect: (
        config = {
            backgroundColor: null,
            color: null,
            borderColor: null,
            boxShadow: null,
        },
    ) => {
        const { backgroundColor, color, borderColor, boxShadow } = config;
        const activeEffect = css`
            ${color && `color: ${color}`};
            ${backgroundColor && `background-color: ${backgroundColor}`};
            ${borderColor && `border-color: ${borderColor}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;
        return css`
            &:not(:disabled) {
                &:active {
                    ${activeEffect}
                }
                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${activeEffect};
                    `}
            }
        `;
    },
    lightenEffect: (
        config = {
            backgroundColor: null,
            color: null,
            borderColor: null,
            boxShadow: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, color, borderColor, boxShadow } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.lighten(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.lighten(color, amount)}`};
            ${borderColor && `border-color: ${helpers.lighten(color, amount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.lighten(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.lighten(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.lighten(color, activeAmount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        return css`
            &:not(:disabled) {
                &:hover {
                    ${hoverEffect};
                }

                &:active {
                    ${activeEffect};
                }

                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${activeEffect} !important;
                    `}
            }
        `;
    },
    darkenEffect: (
        config = {
            backgroundColor: null,
            color: null,
            borderColor: null,
            boxShadow: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, color, borderColor, boxShadow } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.darken(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.darken(color, amount)}`};
            ${borderColor && `border-color: ${helpers.darken(color, amount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.darken(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.darken(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.darken(color, activeAmount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        return css`
            &:not(:disabled) {
                &:hover {
                    ${hoverEffect};
                }

                &:active {
                    ${activeEffect};
                }

                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${activeEffect} !important;
                    `}
            }
        `;
    },
    rgbaEffect: (
        config = {
            backgroundColor: null,
            color: null,
            borderColor: null,
            boxShadow: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, color, borderColor, boxShadow } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.rgba(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.rgba(color, amount)}`};
            ${borderColor && `border-color: ${helpers.rgba(color, amount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.rgba(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.rgba(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.rgba(color, activeAmount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        return css`
            &:not(:disabled) {
                &:hover {
                    ${hoverEffect};
                }

                &:active {
                    ${activeEffect};
                }

                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${activeEffect} !important;
                    `}
            }
        `;
    },
    insetBorderEffect: (borderColor, amount = '0.01rem') => css`
        &:not(:disabled) {
            &:hover,
            &:active {
                box-shadow: inset 0 0 0 ${amount} ${borderColor};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 ${amount} ${borderColor} !important;
                `}
        }
    `,
    fieldHover: css`
        &:hover {
            border: 1px solid ${({ theme }) => helpers.darken(theme.colors.fieldBorder, 0.025)};
            background-color: ${({ theme }) => helpers.darken(theme.colors.fieldBackground, 0.03)};
        }
    `,
    fieldFocus: css`
        &:focus {
            outline: none;
            background-color: ${({ theme }) => helpers.lighten(theme.colors.fieldBackground, 0.03)};
            border: 1px solid ${({ theme }) => theme.colors.borderFocus};
            box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.colors.borderFocus};
        }
    `,
    fieldInvalid: css`
        ${({ invalid, theme }) =>
            invalid &&
            css`
                &,
                &:invalid,
                &:focus {
                    border: 1px solid ${theme.colors.danger} !important;
                    box-shadow: none !important;
                }
            `};
    `,
};

export default effects;
