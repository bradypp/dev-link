import { css } from 'styled-components/macro';

const utils = {
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
    fieldHover: css`
        &:hover {
            background-color: ${({ theme }) => theme.colors.background2};
        }
    `,
    fieldFocus: css`
        &:focus {
            background-color: #fff;
            border: 0.1rem solid ${({ theme }) => theme.colors.borderFocus};
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
                    border: 0.1rem solid ${theme.colors.danger};
                    box-shadow: none;
                }
            `};
    `,
};

export default utils;
