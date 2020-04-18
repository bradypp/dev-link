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
    hoverEffect: (
        config = { backgroundColor: null, textColor: null, borderColor: null, boxShadow: null },
    ) => {
        const { backgroundColor, textColor, borderColor, boxShadow } = config;
        return css`
            &:not(:disabled) {
                &:hover {
                    ${textColor && `color: ${textColor}`};
                    ${backgroundColor && `background-color: ${backgroundColor}`};
                    ${borderColor && `border-color: ${borderColor}`};
                    ${boxShadow && `box-shadow: ${boxShadow}`};
                }
            }
        `;
    },
    activeEffect: (
        config = { backgroundColor: null, textColor: null, borderColor: null, boxShadow: null },
    ) => {
        const { backgroundColor, textColor, borderColor, boxShadow } = config;
        const activeEffect = css`
            ${textColor && `color: ${textColor}`};
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
            textColor: null,
            borderColor: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, borderColor } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.lighten(backgroundColor, amount)}`};
            ${textColor && `color:  ${colorHelpers.lighten(textColor, amount)}`};
            ${borderColor && `border-color: ${colorHelpers.lighten(textColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.lighten(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${colorHelpers.lighten(textColor, activeAmount)}`};
            ${borderColor && `border-color: ${colorHelpers.lighten(textColor, activeAmount)}`};
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
            borderColor: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, borderColor } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.darken(backgroundColor, amount)}`};
            ${textColor && `color:  ${colorHelpers.darken(textColor, amount)}`};
            ${borderColor && `border-color: ${colorHelpers.darken(textColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.darken(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${colorHelpers.darken(textColor, activeAmount)}`};
            ${borderColor && `border-color: ${colorHelpers.darken(textColor, activeAmount)}`};
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
            borderColor: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, borderColor } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.rgba(backgroundColor, amount)}`};
            ${textColor && `color:  ${colorHelpers.rgba(textColor, amount)}`};
            ${borderColor && `border-color: ${colorHelpers.rgba(textColor, amount)}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${colorHelpers.rgba(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${colorHelpers.rgba(textColor, activeAmount)}`};
            ${borderColor && `border-color: ${colorHelpers.rgba(textColor, activeAmount)}`};
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
