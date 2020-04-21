import { css } from 'styled-components/macro';
import Color from 'color';

const utils = {
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
    listElementPadding: (padding = '0.8rem') => css`
        & > *:first-child {
            padding: 0 0 ${padding};
        }
        & > *:not(:first-child):not(:last-child) {
            padding: ${padding} 0;
        }
        & > *:last-child {
            padding: ${padding} 0 0;
        }
    `,
    listElementSeparators: (color = 'border1') => css`
        & > *:not(:last-child) {
            border-bottom: solid 1px ${({ theme }) => theme.colors[color] || color};
        }
    `,
};

export default utils;
