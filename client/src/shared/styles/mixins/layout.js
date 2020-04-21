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

    inlineFlexCenter: css`
        display: inline-flex;
        justify-content: center;
        align-items: center;
    `,
};

export default layout;
