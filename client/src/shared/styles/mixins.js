import { css } from 'styled-components/macro';
import { helpers } from 'shared/styles';

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
    button: css`
        cursor: pointer;
        background: none;
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 1.6rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: none;
        vertical-align: middle;
        white-space: nowrap;
        appearance: none;
        overflow: hidden;
        position: relative;
        width: min-content;
        outline: none;
        border: 0;
        border-radius: 0;
        appearance: none;

        &:focus,
        &:active {
            outline: none;
        }

        &:disabled {
            opacity: 0.7;
            cursor: default;
        }
    `,
    link: css`
        cursor: pointer;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.textLink};

        &:hover,
        &:visited,
        &:active {
            color: ${({ theme }) => helpers.lighten(theme.colors.textLink, 0.1)};
        }

        &:hover {
            text-decoration: underline;
        }
    `,
};

export default mixins;
