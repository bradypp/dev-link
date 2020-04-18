import { css } from 'styled-components/macro';
import { helpers } from 'shared/styles';

// TODO: add every flex variation?
const layoutMixins = {
    gridLayout: (gridColumns = 16, gridGap = '1.6rem') => css`
        display: grid;
        grid-template-columns: repeat(${gridColumns}, minmax(min-content, 1fr));
        grid-gap: ${gridGap};
    `,
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    flexCenterLeft: css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `,
    flexCenterRight: css`
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `,
    flexCenterBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    inlineFlexCenter: css`
        display: inline-flex;
        justify-content: center;
        align-items: center;
    `,
    inlineFlexCenterLeft: css`
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
    `,
    inlineFlexCenterRight: css`
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
    `,
    inlineflexCenterBetween: css`
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
    `,
    flexColumnCenter: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    flexColumnLeft: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    `,
    flexColumnRight: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    `,
};

const mixins = {
    ...layoutMixins,
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
};

export default mixins;
