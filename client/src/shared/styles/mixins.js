import { css } from 'styled-components/macro';
import Color from 'color';

const mixins = {
    flexCenter: css`
        display: flex;
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
    boxShadowCover: css`
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    `,
    boxShadowMedium: css`
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    `,
    boxShadowDropdown: css`
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
    `,
    centerAndContain: maxWidth => css`
        width: ${maxWidth}rem;
        margin: auto;
    `,
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

export default mixins;
