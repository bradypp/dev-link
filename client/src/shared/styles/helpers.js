import { css } from 'styled-components/macro';
import Color from 'color';

const colorHelpers = {
    darken: (colorValue, amount) =>
        Color(colorValue)
            .darken(amount)
            .string(),
    lighten: (colorValue, amount) =>
        Color(colorValue)
            .lighten(amount)
            .string(),
    rgba: (colorValue, opacity) =>
        Color(colorValue)
            .alpha(opacity)
            .string(),
};

// TODO: test the following effects mixins
const effectHelpers = {
    lightenEffect: (
        config = {
            backgroundColor: null,
            textColor: null,
            border: null,
            borderColor: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, border, borderColor } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.lighten(backgroundColor, amount)}`};
            ${textColor && `color:  ${colorHelpers.lighten(textColor, amount)}`};
            ${borderColor && `border: ${border} ${colorHelpers.lighten(textColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.lighten(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${colorHelpers.lighten(textColor, activeAmount)}`};
            ${borderColor && `border: ${border} ${colorHelpers.lighten(textColor, activeAmount)}`};
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
            textColor: null,
            border: null,
            borderColor: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, border, borderColor } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.darken(backgroundColor, amount)}`};
            ${textColor && `color:  ${colorHelpers.darken(textColor, amount)}`};
            ${borderColor && `border: ${border} ${colorHelpers.darken(textColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.darken(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${colorHelpers.darken(textColor, activeAmount)}`};
            ${borderColor && `border: ${border} ${colorHelpers.darken(textColor, activeAmount)}`};
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
            textColor: null,
            border: null,
            borderColor: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, border, borderColor } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.rgba(backgroundColor, amount)}`};
            ${textColor && `color:  ${colorHelpers.rgba(textColor, amount)}`};
            ${borderColor && `border: ${border} ${colorHelpers.rgba(textColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.rgba(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${colorHelpers.rgba(textColor, activeAmount)}`};
            ${borderColor && `border: ${border} ${colorHelpers.rgba(textColor, activeAmount)}`};
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
    shadowEffect: boxShadow => {
        const effect = css`
            box-shadow: ${boxShadow};
        `;

        return css`
            &:not(:disabled) {
                &:hover,
                &:active {
                    ${effect};
                }

                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${effect} !important;
                    `}
            }
        `;
    },
    fillBackground: (backgroundColor, textColor = null) => {
        const fillEffect = css`
            ${textColor && `color: ${textColor}`};
            background-color: ${backgroundColor};
        `;
        return css`
            &:not(:disabled) {
                &:hover,
                &:active {
                    ${fillEffect};
                }

                ${({ isActive }) =>
                    isActive &&
                    css`
                        ${fillEffect};
                    `}
            }
        `;
    },
    insetBorder: (borderColor, amount = '0.01rem') => css`
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
};

const helpers = {
    ...colorHelpers,
    ...effectHelpers,
    customScrollbar: (config = {}) => css`
        &::-webkit-scrollbar {
            width: ${config.width || 8}px;
        }
        &::-webkit-scrollbar-track {
            background: none;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 99px;
            background: ${({ theme }) => config.background || theme.colors.scrollBar};
        }
    `,
    backgroundImage: imageURL => css`
        background-image: url("${imageURL}");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background: ${({ theme }) => theme.colors.background2};
    `,
    placeholderColor: colorValue => css`
        ::-webkit-input-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        :-moz-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        ::-moz-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        :-ms-input-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
    `,
};

export default helpers;
