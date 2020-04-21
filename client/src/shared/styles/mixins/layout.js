import { css } from 'styled-components/macro';

const layout = {
    gridLayout: (gridColumns = 16, gridGap = '1.6rem') => css`
        display: grid;
        grid-template-columns: repeat(${gridColumns}, minmax(min-content, 1fr));
        grid-gap: ${gridGap};
    `,
    containAndCenter: css`
        max-width: ${({ theme }) => theme.layout.maxWidth};
        margin: 0 auto;
        width: 100%;
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
    flexColumnCenterBetween: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `,
    flexColumnLeftBetween: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    `,
    flexColumnRightBetween: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
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
    inlineFlexCenterBetween: css`
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
    `,
    inlineFlexColumnCenter: css`
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    inlineFlexColumnLeft: css`
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    `,
    inlineFlexColumnRight: css`
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    `,
    inlineFlexColumnCenterBetween: css`
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `,
    inlineFlexColumnLeftBetween: css`
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    `,
    inlineFlexColumnRightBetween: css`
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    `,
};

export default layout;
