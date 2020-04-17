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

const buttonHelpers = {
    lightenBackground: (
        config = {
            backgroundColor: null,
            amount: null,
        },
    ) => css`
        &:not(:disabled) {
            &:hover {
                background-color: ${colorHelpers.lighten(
                    config.backgroundColor,
                    config.amount || 0.05,
                )};
            }

            &:active {
                background-color: ${config.backgroundColor};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    background-color: ${config.backgroundColor} !important;
                `}
        }
    `,
    darkenBackground: (
        config = {
            backgroundColor: null,
            amount: null,
        },
    ) => css`
        &:not(:disabled) {
            &:hover {
                background-color: ${colorHelpers.darken(
                    config.backgroundColor,
                    config.amount || 0.05,
                )};
            }

            &:active {
                background-color: ${config.backgroundColor};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    background-color: ${config.backgroundColor} !important;
                `}
        }
    `,
    rgbaBackground: (
        config = {
            backgroundColor: null,
            opacity: null,
        },
    ) => css`
        &:not(:disabled) {
            &:hover {
                background-color: ${colorHelpers.rgba(
                    config.backgroundColor,
                    config.opacity || 0.05,
                )};
            }

            &:active {
                background-color: ${config.backgroundColor};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    background-color: ${config.backgroundColor} !important;
                `}
        }
    `,
    insetBorder: (
        config = {
            borderColor: null,
            amount: null,
        },
    ) => css`
        &:not(:disabled) {
            &:hover,
            &:active {
                box-shadow: inset 0 0 0 ${config.amount || '0.01rem'} ${config.borderColor};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    box-shadow: inset 0 0 0 ${config.amount || '0.01rem'} ${config.borderColor} !important;
                `}
        }
    `,
    lightenBorder: (
        config = {
            border: null,
            color: null,
            amount: null,
        },
    ) => css`
        &:not(:disabled) {
            &:hover {
                border: ${config.border || '1px solid'}
                    ${colorHelpers.lighten(config.color, config.amount || 0.05)};
            }

            &:active {
                border: ${config.border || '1px solid'} ${config.color};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    border: ${config.border || '1px solid'} ${config.color} !important;
                `}
        }
    `,
    darkenBorder: (
        config = {
            border: null,
            color: null,
            amount: null,
        },
    ) => css`
        &:not(:disabled) {
            &:hover {
                border: ${config.border || '1px solid'}
                    ${colorHelpers.darken(config.color, config.amount || 0.05)};
            }

            &:active {
                border: ${config.border || '1px solid'} ${config.color};
            }

            ${({ isActive }) =>
                isActive &&
                css`
                    border: ${config.border || '1px solid'} ${config.color} !important;
                `}
        }
    `,
};

const helpers = {
    ...colorHelpers,
    ...buttonHelpers,
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
