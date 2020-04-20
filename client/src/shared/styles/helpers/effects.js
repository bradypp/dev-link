import { css } from 'styled-components/macro';
import utils from './utils';

// TODO: test the effects helpers
const effects = {
    hoverEffect: (
        config = {
            backgroundColor: null,
            textColor: null,
            borderColor: null,
            boxShadow: null,
        },
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
        config = {
            backgroundColor: null,
            textColor: null,
            borderColor: null,
            boxShadow: null,
        },
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
            boxShadow: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, borderColor, boxShadow } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${utils.lighten(backgroundColor, amount)}`};
            ${textColor && `color:  ${utils.lighten(textColor, amount)}`};
            ${borderColor && `border-color: ${utils.lighten(textColor, amount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${utils.lighten(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${utils.lighten(textColor, activeAmount)}`};
            ${borderColor && `border-color: ${utils.lighten(textColor, activeAmount)}`};
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
            textColor: null,
            borderColor: null,
            boxShadow: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, borderColor, boxShadow } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${utils.darken(backgroundColor, amount)}`};
            ${textColor && `color:  ${utils.darken(textColor, amount)}`};
            ${borderColor && `border-color: ${utils.darken(textColor, amount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        const activeEffect = css`
            ${backgroundColor &&
                `background-color:  ${utils.darken(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${utils.darken(textColor, activeAmount)}`};
            ${borderColor && `border-color: ${utils.darken(textColor, activeAmount)}`};
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
            textColor: null,
            borderColor: null,
            boxShadow: null,
        },
        amount = 0.05,
    ) => {
        const { backgroundColor, textColor, borderColor, boxShadow } = config;
        const activeAmount = amount + 0.05;

        const hoverEffect = css`
            ${backgroundColor && `background-color:  ${utils.rgba(backgroundColor, amount)}`};
            ${textColor && `color:  ${utils.rgba(textColor, amount)}`};
            ${borderColor && `border-color: ${utils.rgba(textColor, amount)}`};
            ${boxShadow && `box-shadow: ${boxShadow}`};
        `;

        const activeEffect = css`
            ${backgroundColor && `background-color:  ${utils.rgba(backgroundColor, activeAmount)}`};
            ${textColor && `color:  ${utils.rgba(textColor, activeAmount)}`};
            ${borderColor && `border-color: ${utils.rgba(textColor, activeAmount)}`};
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
};

export default effects;
