import { css } from 'styled-components/macro';
import Color from 'color';

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
    boxShadowMedium: css`
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    `,
    boxShadowCover: css`
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    `,
    boxShadowCard: css`
        box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.15), 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
    `,
    boxShadowDropdown: css`
        box-shadow: rgba(9, 30, 66, 0.25) 0 0.4rem 0.8rem -0.2rem, rgba(9, 30, 66, 0.31) 0 0x 0.1rem;
    `,
    containAndCenter: css`
        max-width: ${({ theme }) => theme.layout.maxWidth};
        margin: 0 auto;
        width: 100%;
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
