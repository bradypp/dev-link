import { css } from 'styled-components/macro';
import Color from 'color';

const helpers = {
    darken: (colorValue, amount = '0.04') =>
        Color(colorValue)
            .darken(amount)
            .string(),
    lighten: (colorValue, amount = '0.04') =>
        Color(colorValue)
            .lighten(amount)
            .string(),
    rgba: (colorValue, opacity = '0.04') =>
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
            border-radius: 10rem;
            background-color: ${({ theme }) => config.background || theme.colors.scrollBar};
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
    translate: (left = 0, top = 0) => css`
        transform: translate(${left}px, ${top}px);
    `,
};

export default helpers;
