import { css } from 'styled-components/macro';
import helpers from './helpers';

const effects = {
    hoverEffect: (backgroundColor = null, color = null, borderColor = null) => css`
        &:not(:disabled) {
            &:hover {
                ${color && `color: ${color}`};
                ${backgroundColor && `background-color: ${backgroundColor}`};
                ${borderColor && `border-color: ${borderColor}`};
            }
        }
    `,

    activeEffect: (backgroundColor = null, color = null, borderColor = null) => {
        const activeEffect = css`
            ${color && `color: ${color}`};
            ${backgroundColor && `background-color: ${backgroundColor}`};
            ${borderColor && `border-color: ${borderColor}`};
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
    lightenEffect: (backgroundColor = null, color = null, borderColor = null, amount = 0.06) => {
        const activeAmount = amount * 2;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.lighten(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.lighten(color, amount)}`};
            ${borderColor && `border-color: ${helpers.lighten(borderColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.lighten(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.lighten(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.lighten(borderColor, activeAmount)}`};
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
    darkenEffect: (backgroundColor = null, color = null, borderColor = null, amount = 0.06) => {
        const activeAmount = amount * 2;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.darken(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.darken(color, amount)}`};
            ${borderColor && `border-color: ${helpers.darken(borderColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.darken(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.darken(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.darken(borderColor, activeAmount)}`};
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
    rgbaDarkenEffect: (backgroundColor = null, color = null, borderColor = null, amount = 0.04) => {
        const activeAmount = amount * 2;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.rgba(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.rgba(color, amount)}`};
            ${borderColor && `border-color: ${helpers.rgba(borderColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.rgba(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.rgba(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.rgba(borderColor, activeAmount)}`};
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
    rgbaLightenEffect: (
        backgroundColor = null,
        color = null,
        borderColor = null,
        amount = 0.04,
    ) => {
        const activeAmount = amount / 2;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${helpers.rgba(backgroundColor, amount)}`};
            ${color && `color:  ${helpers.rgba(color, amount)}`};
            ${borderColor && `border-color: ${helpers.rgba(borderColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${helpers.rgba(backgroundColor, activeAmount)}`};
            ${color && `color:  ${helpers.rgba(color, activeAmount)}`};
            ${borderColor && `border-color: ${helpers.rgba(borderColor, activeAmount)}`};
        `;

        return css`
            &:not(:disabled) {
                &:hover,
                &:active {
                    ${hoverEffect};
                }

                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${activeEffect} !important;
                    `}
            }
        `;
    },
    insetBorderEffect: (borderColor, amount = '1px') => css`
        &:not(:disabled) {
            &:hover,
            &:active {
                color: ${helpers.darken(borderColor)};
                box-shadow: inset 0 0 0 ${amount} ${helpers.darken(borderColor)};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    color: ${helpers.darken(borderColor)};
                    box-shadow: inset 0 0 0 ${amount} ${helpers.darken(borderColor)} !important;
                `}
        }
    `,
    boxShadowEffect: boxShadow => css`
        &:not(:disabled) {
            &:hover,
            &:active {
                box-shadow: ${boxShadow};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: ${boxShadow} !important;
                `}
        }
    `,
    fieldHover: css`
        &:hover {
            border: 1px solid ${({ theme }) => helpers.darken(theme.colors.fieldBorder, 0.02)};
            background-color: ${({ theme }) => helpers.darken(theme.colors.fieldBackground, 0.02)};
        }
    `,
    fieldFocus: css`
        &:focus {
            outline: none;
            background-color: ${({ theme }) => helpers.lighten(theme.colors.fieldBackground, 0.02)};
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
    cardHover: css`
        &:hover {
            background-color: ${({ theme }) => theme.colors.background2};
            border: 1px solid ${({ theme }) => theme.colors.border1};
        }
    `,
};

export default effects;
