import { css } from 'styled-components/macro';

const utils = {
    clearfix: css`
        &:after {
            content: '';
            display: table;
            clear: both;
        }
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
    scrollableY: css`
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `,
    clickable: css`
        cursor: pointer;
        user-select: none;
    `,
    hardwareAccelerate: css`
        transform: translateZ(0);
    `,
    hideElement: css`
        position: absolute;
        pointer-events: none;
        visibility: hidden;
        opacity: 0;
    `,
};

export default utils;
