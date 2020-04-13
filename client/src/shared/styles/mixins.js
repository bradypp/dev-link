import { css } from 'styled-components/macro';
import Color from 'color';

const functions = {
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
            background: ${({ theme }) => config.backgroundColor || theme.colors.scrollBar};
        }
    `,
    backgroundImage: imageURL => css`
        background-image: url("${imageURL}");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: ${({ theme }) => theme.colors.background2};
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
    tag: (config = {}) => css`
        display: inline-flex;
        align-items: center;
        font-size: config.fontSize || 1.2rem;
        height: 24px;
        padding: 0 8px;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        color: ${({ theme }) => config.textColor || theme.colors.textPrimary1};
        background: ${({ theme }) => config.backgroundColor || theme.colors.background1};
        i {
            margin-left: 4px;
        }
    `,
};

const mixins = {
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    inlineFlexCenter: css`
        display: inline-flex;
        justify-content: center;
        align-items: center;
    `,
    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    engulf: css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    `,
    overflowEllipsis: css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1px;
    `,
    containAndCenter: css`
        max-width: ${({ theme }) => theme.layout.maxWidth};
        margin: 0 auto;
        width: 100%;
    `,
    scrollableY: css`
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `,
    truncateText: css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `,
    clickable: css`
        cursor: pointer;
        user-select: none;
    `,
    hardwareAccelerate: css`
        transform: translateZ(0);
    `,
    link: css`
        cursor: pointer;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.textLink};
        transition: all 0.1s ease;
        &:hover,
        &:visited,
        &:active {
            color: ${({ theme }) => mixins.lighten(theme.colors.textLink, 0.1)};
        }
        &:hover {
            text-decoration: underline;
        }
    `,
    ...functions,
};

export default mixins;
